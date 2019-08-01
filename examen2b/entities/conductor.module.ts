import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConductorEntity} from './conductor.entity';
import {ConductorService} from './conductor.service';
@Module( {
    imports: [
        TypeOrmModule.forFeature(
            [ConductorEntity],
            'default',
        ),
    ],
    // Controladores
    providers: [ConductorService],
    exports: [ConductorService],
})
export class ConductorModule {}