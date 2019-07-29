import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {UsuarioEntity} from '../entities/usuario.entity';
import {Usuario} from '../interfaces/usuario';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(UsuarioEntity) private readonly _usuarioRepository: Repository<UsuarioEntity>) {
        const usuario: Usuario = {
            cedula: '1111111111',
            nombreApellido: 'Usuario Uno',
            direccion: 'Direccion Uno',
            celular: '1010101010',
            username: 'usuarioUno',
            password: 'passwordUno',
            rolId: 0,
        };
        this.crearUsuario(usuario);
    }
    verificarPassword(usernames: string): Promise<UsuarioEntity> {
        return  this._usuarioRepository.findOne({ username: usernames});
    }
    crearUsuario(nuevoUsuario: Usuario): Promise<UsuarioEntity> {
        const objetoEntidad = this._usuarioRepository.create(nuevoUsuario);
        return this._usuarioRepository.save(objetoEntidad);
    }
    buscarPorId(usuarioid: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne({ usuarioId: usuarioid});
    }
}
