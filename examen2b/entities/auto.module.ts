import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AutoEntity} from './auto.entity';
import {AutoService} from './auto.service';
@Module( {
    imports: [
        TypeOrmModule.forFeature(
            [AutoEntity],
            'default',
        ),
    ], // Modulos
    providers: [AutoService], // Servicios
    exports: [AutoService], // Exportar servicios
})
export class AutoModule {}