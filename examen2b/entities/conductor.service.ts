import {Injectable} from '@nestjs/common';
import {ConductorEntity} from '../entities/conductor.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Conductor} from '../interfaces/conductor';
import {TragosEntity} from "../../01-http/02-servidor-web-nodejs/api-web/src/trago/tragos.entity";

@Injectable()
export class ConductorService {
    constructor(@InjectRepository(ConductorEntity) private readonly _conductorRepository: Repository<ConductorEntity>) {
        const conductor: Conductor = {
            nombres: 'Conductor',
            apellidos: 'Uno',
            fechaNacimiento: new Date(1990, 9, 9),
            numeroAutos: 3,
            licenciaValida: true,
        };
        this.crearConductor(conductor);
    }
    crearConductor(nuevoConductor: Conductor): Promise<ConductorEntity> {
        const objetoEntidad = this._conductorRepository.create(nuevoConductor);
        return this._conductorRepository.save(objetoEntidad);
    }
    getConductores(): Promise<ConductorEntity[]> {
        return this._conductorRepository.find();
    }
}
