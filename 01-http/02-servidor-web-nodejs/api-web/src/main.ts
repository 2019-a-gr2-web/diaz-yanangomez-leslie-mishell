import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const cookieParser = require('cookie-parser');
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import * as express from 'express';
import * as session from 'express-session'; // Typescript
const FileStore = require('session-file-store')(session); // Nodejs
import * as path from 'path';
import * as favicon from 'serve-favicon';
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication; // casteo
  app.use(cookieParser('Boyfriend in Wonderland'));
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  // app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'trago.ico')));
  // app.set('views engine', 'ejs');
  app.use(
      session({
        name: 'server-session-id',
        secret: 'Boyfriend-in-Wonderland',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false
        },
        store: new FileStore()
      })
  );
  await app.listen(3000);

}
bootstrap();
