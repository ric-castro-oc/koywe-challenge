import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { QuoteModule } from './modules/quote.module';
import { PrismaService } from './dal/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, QuoteModule],
  providers: [PrismaService],
})
export class AppModule {}
