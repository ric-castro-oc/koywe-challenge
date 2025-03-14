import { Prisma } from '@prisma/client';

export class Quote {
  id: number;
  from: string;
  to: string;
  amount: Prisma.Decimal;
  rate: Prisma.Decimal;
  convertedAmount: Prisma.Decimal;
  timestamp: Date;
  expiresAt: Date;
}
