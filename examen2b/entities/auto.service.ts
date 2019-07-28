import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {AutoEntity} from '../entities/auto.entity';
import {Auto} from '../interfaces/auto';

@Injectable()
export class AutoService {
    constructor(@InjectRepository(AutoEntity) private readonly _autoRepository: Repository<AutoEntity>) {
        const auto: Auto = {
            chasis: 30,
            nombreMarca: 'Hyundai',
            colorUno: 'gris',
            colorDos: 'plateado',
            nombreModelo: 'EX599',
            anio: 2016,
            conductorId: 1,
        };
        this.crearAuto(auto);

    }
    crearAuto(nuevoAuto: Auto): Promise<AutoEntity> {
        // @ts-ignore
        const objetoEntidad = this._autoRepository.create(nuevoAuto);
        return this._autoRepository.save(objetoEntidad);
    }
    eliminarAutoPorId(idt: number): Promise<DeleteResult> {
        return this._autoRepository.delete({autoId: idt});
    }

    buscarAuto(parametrosBusqueda?): Promise<AutoEntity[]> {
        return this._autoRepository.find(parametrosBusqueda);
    }

    buscarPorId(idt: number): Promise<AutoEntity[]> {
        return this._autoRepository.find({autoId: idt});
    }

    actualizarAuto(auto: Auto): Promise<UpdateResult> {
        return this._autoRepository.update(auto.autoId, {colorUno: auto.colorUno, colorDos: auto.colorDos});
    }
}
