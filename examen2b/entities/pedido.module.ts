import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PedidoEntity} from './pedido.entity';
import {PedidoService} from './pedido.service';
@Module( {
    imports: [
        TypeOrmModule.forFeature(
            [PedidoEntity],
            'default',
        ),
    ], // Modulos
    // Controladores
    providers: [PedidoService], // Servicios
    exports: [PedidoService] // Exportar servicios
})
export class PedidoModule {

}

