import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log( process.env.DB_USER_ID)
  await app.listen(4500);
}

bootstrap();
