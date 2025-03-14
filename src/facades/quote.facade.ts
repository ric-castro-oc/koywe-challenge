import { Injectable } from '@nestjs/common';
import { QuoteService } from '../bll/quote.service';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';

@Injectable()
export class QuoteFacade {
  constructor(private quoteService: QuoteService) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto);
  }

  async getQuote(id: number): Promise<Quote> {
    return this.quoteService.getQuoteById(id);
  }
}
