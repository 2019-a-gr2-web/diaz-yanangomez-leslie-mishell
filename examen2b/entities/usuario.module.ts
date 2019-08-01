import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {UsuarioService} from './usuario.service';
import {AppController} from '../src/app.controller';
@Module( {
    imports: [
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default',
        ),
    ],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule {}