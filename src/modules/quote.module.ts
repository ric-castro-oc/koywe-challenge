import { Module } from '@nestjs/common';
import { QuoteController } from '../controllers/quote.controller';
import { QuoteService } from '../bll/quote.service';
import { QuoteFacade } from '../facades/quote.facade';
import { QuoteRepository } from '../dal/repositories/quote.repository';
import { ExchangeProvider } from '../providers/exchange-rate/exchange.provider';
import { PrismaService } from '../dal/prisma/prisma.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [QuoteController],
  providers: [
    QuoteService,
    QuoteFacade,
    QuoteRepository,
    ExchangeProvider,
    PrismaService,
  ],
})
export class QuoteModule {}
