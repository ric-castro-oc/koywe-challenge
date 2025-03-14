import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../bll/auth.service';
import { RegisterDto, LoginDto } from '../models/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
