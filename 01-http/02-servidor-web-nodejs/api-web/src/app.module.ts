import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragoModule} from './trago/trago.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from './trago/tragos.entity';
import {DistribuidorEntity} from './distribuidor/distribuidor.entity';
import {FiestaEntity} from './fiesta/fiesta.entity';
import {FiestaModule} from './fiesta/fiesta.module';
import {DistribuidorModule} from './distribuidor/distribuidor.module';
@Module({
  imports: [TragoModule, FiestaModule, DistribuidorModule,  // Ya nada toca poner esto
    TypeOrmModule.forRoot({
      name: 'default', // Nombre por defecto de la cadena de conexion, ya esta puesta, si existe otra cadena, es necesario poner los nombres
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [TragosEntity, DistribuidorEntity, FiestaEntity],
      synchronize: true,
      insecureAuth: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
