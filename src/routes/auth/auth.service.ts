import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';

import {
  isRecordNotFoundPrismaError,
  isUniqueContraintPrismaError,
} from 'src/shared/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async loginUser(body: any) {
    // if (!isEmail(body.email)) {
    //   throw new UnprocessableEntityException('Email format is invalid');
    // }
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPassswordValid = this.hashingService.compare(
      body.password,
      user.password,
    );
    if (!isPassswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const tokens = await this.generateTokens(user.id);
    return tokens;
  }

  async generateTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ userId }),
      this.tokenService.signRefreshToken({ userId }),
    ]);

    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(payload.exp * 1000),
      },
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(body: any) {
    try {
      const token = body.refreshToken;
      const payload = await this.tokenService.verifyRefreshToken(token);
      const storedToken =
        await this.prismaService.refreshToken.findUniqueOrThrow({
          where: { token: token },
        });
      await this.prismaService.refreshToken.delete({ where: { token: token } });
      const tokens = await this.generateTokens(payload.userId);
      return tokens;
    } catch (error) {
      if (isRecordNotFoundPrismaError(error)) {
        throw new UnauthorizedException('Refresh token was invoked');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async registerUser(body: any) {
    try {
      const hashedPassword = this.hashingService.hashData(body.password);
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hashedPassword,
          phoneNumber: body.phoneNumber,
          roleId: body.roleId,
        },
      });
      return user;
    } catch (error) {
      if (isUniqueContraintPrismaError(error)) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async logout(body: any) {
    try {
      const token = body.refreshToken;
      const payload = await this.tokenService.verifyRefreshToken(token);
      await this.prismaService.refreshToken.delete({ where: { token: token } });
      return 'Logout successful';
    } catch (error) {
      if (isRecordNotFoundPrismaError(error)) {
        throw new UnauthorizedException('Refresh token was invoked');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({ where: { id: userId } });
  }
}
