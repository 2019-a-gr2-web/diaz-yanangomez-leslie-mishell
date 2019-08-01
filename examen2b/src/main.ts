import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import * as express from 'express';
import * as session from 'express-session';
const FileStore = require('session-file-store')(session); // Nodejs
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('Boyfriend in Wonderland'));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  app.use(
      session({
        name: 'server-session-id',
        secret: 'I-Forget-My-Secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
        },
        store: new FileStore(),
      }),
  );
  await app.listen(3000);
}
bootstrap();
