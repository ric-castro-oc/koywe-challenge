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
