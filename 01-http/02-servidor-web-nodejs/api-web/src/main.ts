import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const cookieParser = require('cookie-parser');
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication; // casteo
  app.use(cookieParser('Boyfriend in Wonderland'));
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.set('views engine', 'ejs');
  await app.listen(3000);

}
bootstrap();
