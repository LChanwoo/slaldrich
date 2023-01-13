import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(4500);
}

bootstrap();
