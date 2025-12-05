import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envConfig from '../config';
import { StringValue } from 'ms';
import { TokenPayload } from '../types/jwt.type';
@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(payload: { userId: number }) {
    return await this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: envConfig.ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRE_IN as StringValue,
    });
  }

  async signRefreshToken(payload: { userId: number }) {
    return await this.jwtService.signAsync(payload, {
      algorithm: 'HS256',
      secret: envConfig.REFRESH_TOKEN_SECRET,
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRE_IN as StringValue,
    });
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    return await this.jwtService.verifyAsync(token, {
        algorithms: ['HS256'],
        secret: envConfig.ACCESS_TOKEN_SECRET,
    }) 
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return await this.jwtService.verifyAsync(token, {
        algorithms: ['HS256'],
        secret: envConfig.REFRESH_TOKEN_SECRET,
    }) 
  }
}
