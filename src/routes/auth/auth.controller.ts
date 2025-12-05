import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() body: any) {
    const tokens = await this.authService.loginUser(body);
    return tokens;
  }

  @Post('register')
//   @SerializeOptions({ type: RegisterResDTO })
  async registerUser(@Body() body: any) {
    const newUser = await this.authService.registerUser(body);
    return newUser
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() body: any) {
    const tokens = await this.authService.refreshTokens(body);
    return tokens;
  }

  @Post('logout')
  async logout(@Body() body: any) {
    return this.authService.logout(body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);
    await this.authService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
