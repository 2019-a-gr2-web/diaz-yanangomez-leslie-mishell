import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication; // casteo
  app.use(cookieParser('Boyfriend in Wonderland'));
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  // app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'cec.ico')));
  await app.listen(3000);
}
bootstrap();
