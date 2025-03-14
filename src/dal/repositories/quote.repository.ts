import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Quote } from '../../models/entities/quote.entity';

@Injectable()
export class QuoteRepository {
  constructor(private prisma: PrismaService) {}

  async create(quote: Omit<Quote, 'id'>): Promise<Quote> {
    return this.prisma.quote.create({
      data: quote,
    });
  }

  async findById(id: number): Promise<Quote | null> {
    return this.prisma.quote.findUnique({
      where: { id },
    });
  }
}
