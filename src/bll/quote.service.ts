import { Injectable, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../dal/repositories/quote.repository';
import { ExchangeProvider } from '../providers/exchange-rate/exchange.provider';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuoteService {
  constructor(
    private quoteRepository: QuoteRepository,
    private priceProvider: ExchangeProvider,
  ) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { amount, from, to } = createQuoteDto;

    // Get rate from provider
    const rate = await this.priceProvider.getExchangeRate(from, to);

    // Calculate converted amount
    const _amount = new Prisma.Decimal(amount);
    const convertedAmount = _amount.times(rate.price);

    // Set expiration time (5 minutes)
    const expiresAt = new Date(rate.timestamp.getTime() + 5 * 60 * 1000);

    // Create and store quote
    const quoteData: Omit<Quote, 'id'> = {
      from,
      to,
      amount: _amount,
      rate: new Prisma.Decimal(rate.price),
      convertedAmount,
      timestamp: rate.timestamp,
      expiresAt,
    };

    return this.quoteRepository.create(quoteData);
  }

  async getQuoteById(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findById(+id);
    if (quote && new Date() <= quote.expiresAt) {
      return quote;
    }

    throw new NotFoundException('Quote not found');
  }
}
