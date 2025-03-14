import { Injectable } from '@nestjs/common';
import { AuthService } from '../bll/auth.service';
import { LoginDto, RegisterDto } from '../models/dtos/auth.dto';

@Injectable()
export class AuthFacade {
  constructor(private authService: AuthService) {}

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
