import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DetalleService} from './detalle.service';
import {DetalleEntity} from './detalle.entity';
@Module( {
    imports: [
        TypeOrmModule.forFeature(
            [DetalleEntity],
            'default',
        ),
    ],
    // Controladores
    providers: [DetalleService],
    exports: [DetalleService],
})
export class DetalleModule {}