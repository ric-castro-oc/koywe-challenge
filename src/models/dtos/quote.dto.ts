import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ description: 'The amount to convert' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The source currency' })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ description: 'The destination currency' })
  @IsNotEmpty()
  @IsString()
  to: string;
}

export class QuoteDto {
  @ApiProperty({ description: 'The quote ID' })
  id: number;

  @ApiProperty({ description: 'The source currency' })
  from: string;

  @ApiProperty({ description: 'The destination currency' })
  to: string;

  @ApiProperty({ description: 'The amount to convert' })
  amount: number;

  @ApiProperty({ description: 'The exchange rate' })
  rate: number;

  @ApiProperty({ description: 'The converted amount' })
  convertedAmount: number;

  @ApiProperty({ description: 'The timestamp of the quote' })
  timestamp: Date;

  @ApiProperty({ description: 'The expiration time of the quote' })
  expiresAt: Date;
}
