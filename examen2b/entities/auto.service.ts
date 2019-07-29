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
    eliminarAutoPorId(autoid): Promise<DeleteResult> {
        return this._autoRepository.delete({autoId: autoid});
    }
    getAutos(conductorid): Promise<AutoEntity[]> {
        return this._autoRepository.find({conductorId: conductorid});
    }
    buscarPorChasis(parametro: number): Promise<AutoEntity[]> {
        return this._autoRepository.find({chasis: parametro});
    }
    buscarPorColor(parametro: string): Promise<AutoEntity[]> {
        return this._autoRepository.find({
            where: [
                { colorUno: parametro},
                { colorDos: parametro},
            ],
        });
    }

    actualizarAuto(auto: Auto): Promise<UpdateResult> {
        return this._autoRepository.update(auto.autoId, {colorUno: auto.colorUno, colorDos: auto.colorDos});
    }
}
