import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragoModule} from './trago/trago.module';

@Module({
  imports: [TragoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
