import {Module} from '@nestjs/common';
import {TragosEntity} from './tragos.entity';
import {TragoService} from './trago.service';
import {TragoController} from './trago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module( {
    imports: [
        TypeOrmModule.forFeature( // Recibe un arreglo de entidades y el nombre de la conexion
            [TragosEntity],
            'default'
        ),
    ], // Modulos
    controllers: [ TragoController], // Controladores
    providers: [ TragoService], // Servicios
    exports: [TragoService] // Exportar servicios
})
export class TragoModule {

}

