import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(new ValidationPipe());
  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:5173',
    ], // Replace with your frontend URL
  };
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Currency conversion API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
