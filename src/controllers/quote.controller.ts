import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../providers/jwt-auth.guard';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto, QuoteDto } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('quote')
@ApiTags('quotes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuoteController {
  constructor(private quoteFacade: QuoteFacade) {}

  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<QuoteDto> {
    return this.quoteFacade.createQuote(createQuoteDto);
  }

  @Get(':id')
  async getQuote(@Param('id') id: number): Promise<QuoteDto> {
    return this.quoteFacade.getQuote(id);
  }
}
