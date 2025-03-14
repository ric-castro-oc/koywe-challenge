import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { QuoteRepository } from '../dal/repositories/quote.repository';
import { ExchangeProvider } from '../providers/exchange-rate/exchange.provider';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { Quote } from '../models/entities/quote.entity';
import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

// Mock implementations
const mockQuoteRepository = {
  create: jest.fn(),
  findById: jest.fn(),
};

const mockExchangeProvider = {
  getExchangeRate: jest.fn(),
};

describe('QuoteService', () => {
  let service: QuoteService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        { provide: QuoteRepository, useValue: mockQuoteRepository },
        { provide: ExchangeProvider, useValue: mockExchangeProvider },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    
    // Clear all mock calls between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createQuote', () => {
    it('should create a quote with proper calculations', async () => {
      // Arrange
      const createQuoteDto: CreateQuoteDto = {
        amount: 100,
        from: 'USD',
        to: 'EUR',
      };
      
      const currentDate = new Date();
      const mockRate = {
        price: 0.85,
        timestamp: currentDate,
      };
      
      const expectedQuote: Omit<Quote, 'id'> = {
        from: 'USD',
        to: 'EUR',
        amount: new Prisma.Decimal('100'),
        rate: new Prisma.Decimal(0.85),
        convertedAmount: new Prisma.Decimal('100').times(0.85),
        timestamp: currentDate,
        expiresAt: new Date(currentDate.getTime() + 5 * 60 * 1000),
      };
      
      const createdQuote = { id: 1, ...expectedQuote };
      
      // Mock implementations
      mockExchangeProvider.getExchangeRate.mockResolvedValue(mockRate);
      mockQuoteRepository.create.mockResolvedValue(createdQuote);
      
      // Act
      const result = await service.createQuote(createQuoteDto);
      
      // Assert
      expect(mockExchangeProvider.getExchangeRate).toHaveBeenCalledWith('USD', 'EUR');
      expect(mockQuoteRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        from: 'USD',
        to: 'EUR',
        amount: expect.any(Object), // Decimal
        rate: expect.any(Object),   // Decimal
        convertedAmount: expect.any(Object), // Decimal
        timestamp: currentDate,
        expiresAt: expect.any(Date),
      }));
      expect(result).toEqual(createdQuote);
    });
  });

  describe('getQuoteById', () => {
    it('should return a quote when it exists and is not expired', async () => {
      // Arrange
      const futureDate = new Date();
      futureDate.setMinutes(futureDate.getMinutes() + 3); // 3 minutes in the future
      
      const mockQuote: Quote = {
        id: 1,
        from: 'USD',
        to: 'EUR',
        amount: new Prisma.Decimal('100'),
        rate: new Prisma.Decimal(0.85),
        convertedAmount: new Prisma.Decimal('85'),
        timestamp: new Date(),
        expiresAt: futureDate,
      };
      
      mockQuoteRepository.findById.mockResolvedValue(mockQuote);
      
      // Act
      const result = await service.getQuoteById(1);
      
      // Assert
      expect(mockQuoteRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockQuote);
    });

    it('should throw NotFoundException when quote is expired', async () => {
      // Arrange
      const pastDate = new Date();
      pastDate.setMinutes(pastDate.getMinutes() - 1); // 1 minute in the past
      
      const expiredQuote: Quote = {
        id: 1,
        from: 'USD',
        to: 'EUR',
        amount: new Prisma.Decimal('100'),
        rate: new Prisma.Decimal(0.85),
        convertedAmount: new Prisma.Decimal('85'),
        timestamp: new Date(),
        expiresAt: pastDate,
      };
      
      mockQuoteRepository.findById.mockResolvedValue(expiredQuote);
      
      // Act & Assert
      await expect(service.getQuoteById(1)).rejects.toThrow(NotFoundException);
      expect(mockQuoteRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when quote is not found', async () => {
      // Arrange
      mockQuoteRepository.findById.mockResolvedValue(null);
      
      // Act & Assert
      await expect(service.getQuoteById(999)).rejects.toThrow(NotFoundException);
      expect(mockQuoteRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});