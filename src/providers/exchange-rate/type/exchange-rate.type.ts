import { Prisma } from '@prisma/client';

export type ExchangeRate = {
  from: string;
  to: string;
  price: number;
  timestamp: Date;
};
