import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ExchangeRate } from './type/exchange-rate.type';

@Injectable()
export class ExchangeProvider {
  private readonly logger = new Logger(ExchangeProvider.name);

  async getExchangeRate(from: string, to: string): Promise<ExchangeRate> {
    try {
      const url = `${process.env.EXCHANGE_URL}?from=${from}&to=${to}`;
      const response = await axios.get<ExchangeRate>(url);

      this.logger.log(
        `Rate obtained for ${from} to ${to}: ${response.data.price}`,
      );
      const rate: ExchangeRate = {
        from,
        to,
        price: +response.data[from].price,
        timestamp: new Date(response.data[from].timestamp),
      };
      return rate;
    } catch (error) {
      this.logger.warn(
        `Failed to get real exchange rate, using mocked data: ${error.message}`,
      );

      const mocked: ExchangeRate = {
        from,
        to,
        price: 0,
        timestamp: new Date(),
      };

      // Mocked rates for testing
      const mockRates = {
        ETH_ARS: 434782.61,
        ARS_ETH: 0.0000023,
        BTC_USDC: 50000,
        USDC_BTC: 0.00002,
        // Add other pairs as needed
      };

      const pairKey = `${from}_${to}`;
      if (mockRates[pairKey]) {
        mocked.price = mockRates[pairKey];
      } else {
        // Fallback mock rate
        mocked.price = Math.random() * 1000;
      }
      return mocked;
    }
  }
}
