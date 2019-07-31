import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AutoEntity} from '../entities/auto.entity';
import {ConductorEntity} from '../entities/conductor.entity';
import {UsuarioEntity} from '../entities/usuario.entity';
import {PedidoEntity} from '../entities/pedido.entity';
import {UsuarioModule} from '../entities/usuario.module';
import {PedidoModule} from '../entities/pedido.module';
import {ConductorModule} from '../entities/conductor.module';
import {AutoModule} from '../entities/auto.module';
import {CarritoModule} from './carrito/carrito.module';
import {DetalleModule} from '../entities/detalle.module';
import {DetalleEntity} from '../entities/detalle.entity';
@Module({
  imports: [UsuarioModule, PedidoModule, ConductorModule, AutoModule, CarritoModule, DetalleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'examen2b',
      entities: [AutoEntity, ConductorEntity, UsuarioEntity, PedidoEntity, DetalleEntity],
      synchronize: true,
      insecureAuth: true,
      dropSchema: false }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
