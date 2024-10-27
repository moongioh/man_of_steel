import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
}

bootstrap();
