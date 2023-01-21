import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import session from 'express-session';
import passport from 'passport';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }));
  app.enableCors({
    origin: true,
    credentials: true,
  });
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3095);
}

bootstrap();
