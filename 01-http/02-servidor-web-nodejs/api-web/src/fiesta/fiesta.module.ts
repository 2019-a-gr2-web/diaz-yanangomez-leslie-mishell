import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FiestaEntity} from './fiesta.entity';

@Module( {
    imports: [
        TypeOrmModule.forFeature( // Recibe un arreglo de entidades y el nombre de la conexion
            [FiestaEntity],
            'default'
        ),
    ], // Modulos
    controllers: [], // Controladores
    providers: [], // Servicios
    exports: [] // Exportar servicios
})
export class FiestaModule {
}
