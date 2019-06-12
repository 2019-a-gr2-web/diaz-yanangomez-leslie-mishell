import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragoModule} from './trago/trago.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from './trago/tragos.entity';
@Module({
  imports: [TragoModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre por defecto de la cadena de conexion, ya esta puesta, si existe otra cadena, es necesario poner los nombres
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [TragosEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
