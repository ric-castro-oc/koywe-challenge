import { Injectable } from '@nestjs/common';
import { QuoteService } from '../bll/quote.service';
import { CreateQuoteDto, QuoteDto } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';

@Injectable()
export class QuoteFacade {
  constructor(private quoteService: QuoteService) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<QuoteDto> {
    const quote = (await this.quoteService.createQuote(
      createQuoteDto,
    )) as unknown as QuoteDto;
    quote.amount = +quote.amount;
    quote.rate = +quote.rate;
    quote.convertedAmount = +quote.convertedAmount;
    return quote;
  }

  async getQuote(id: number): Promise<QuoteDto> {
    const quote = (await this.quoteService.getQuoteById(
      id,
    )) as unknown as QuoteDto;
    quote.amount = +quote.amount;
    quote.rate = +quote.rate;
    quote.convertedAmount = +quote.convertedAmount;
    return quote;
  }
}
