import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import session from 'express-session';
import passport from 'passport';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import path, { join } from 'path';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
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
  app.use(cookieParser());
  app.enableCors(
    {
      origin: 'http://localhost:3090',
      credentials: true,
    }
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(express.static(path.join(__dirname, '/public')));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3095);
}

bootstrap();
