import {Module} from '@nestjs/common';
import {TragoService} from './trago.service';
import {TragoController} from './trago.controller';

@Module( {
    imports: [], // Modulos
    controllers: [ TragoController], // Controladores
    providers: [ TragoService], // Servicios
    exports: [TragoService] // Exportar servicios
})
export class TragoModule {

}
