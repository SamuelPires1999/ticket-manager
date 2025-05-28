import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // Enable cookie parsing for JWT
  app.useGlobalPipes(new ValidationPipe()); // Global input validation
  await app.listen(3000);
  console.log(`Application is running on port ${3000}`);
}
bootstrap();
