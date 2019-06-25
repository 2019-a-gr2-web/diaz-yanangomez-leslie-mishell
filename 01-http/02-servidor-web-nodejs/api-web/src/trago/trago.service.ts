import {Injectable} from '@nestjs/common';
import {Trago} from './interfaces/trago';
import {InjectRepository} from '@nestjs/typeorm';
import {TragosEntity} from './tragos.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class TragoService {
    bddTragos: Trago [] = [];
    recNum = 1;
    constructor(@InjectRepository(TragosEntity) private readonly _tragosRepository: Repository<TragosEntity>) { // Importar el repositorio
        const traguito: Trago = {
            nombre: 'Pilsener',
            gradosAlcohol: 4.3,
            fechaCaducidad: new Date(2019, 5, 10),
            precio: 1.75,
            tipo: 'Cerveza'
        };
        this.crear(traguito);
        const objetoEntidad = this._tragosRepository.create(traguito);
        console.log('Linea 1');
        this._tragosRepository.save(objetoEntidad).then(bien => { // try
            console.log('Linea 2');
            console.log('Bien', bien);
        }).catch(error => { // catch
            console.log('Linea 3');
            console.log('Error', error);
        });
        console.log('Linea 4');
    }
    crear(nuevoTrago: Trago): Promise<Trago> { // Cuando no se sabe el tipo de promesa se puede poner entre <> Any
        const objetoEntidad = this._tragosRepository.create(nuevoTrago); // Crea una nueva instancia de la entidad, no en la base de datos
        return this._tragosRepository.save(objetoEntidad);
        // nuevoTrago.id = this.recNum;
        // this.recNum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }
    eliminarPorId(idt: number): Promise<DeleteResult> {
       return this._tragosRepository.delete({id: idt});
    }
    buscar(parametrosBusqueda?): Promise<TragosEntity[]> {
        return this._tragosRepository.find(parametrosBusqueda);
    }
    buscarPorId(idt: number): Promise<TragosEntity[]> {
       return this._tragosRepository.find({id: idt});
    }
    buscarPorNombre(nombre: string): Trago {
        return this.bddTragos.find((trago) => {
            return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
        });
    }
    actualizar(trago: Trago): Promise<UpdateResult> {
        return this._tragosRepository.update(trago.id, { nombre: trago.nombre, precio: trago.precio});
    }
}