import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const cookieParser = require('cookie-parser');
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('Boyfriend in Wonderland'));
  // app.set('view engine', 'view');
  await app.listen(3000);

}
bootstrap();
