import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../bll/auth.service';
import { JwtStrategy } from '../providers/jwt.strategy';
import { UserRepository } from '../dal/repositories/user.repository';
import { PrismaService } from '../dal/prisma/prisma.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, PrismaService],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}