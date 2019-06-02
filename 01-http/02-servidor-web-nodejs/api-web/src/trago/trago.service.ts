import {Injectable} from '@nestjs/common';
import {Trago} from './interfaces/trago';

@Injectable()
export class TragoService {
    bddTragos: Trago [] = [];
    recNum = 1;
    constructor() {
        const traguito: Trago = {
            nombre: 'Pilsener',
            gradosAlcohol: 4.3,
            fechaCaducidad: new Date(2019, 5, 10),
            precio: 1.75,
            tipo: 'Cerveza'
        };
        this.crear(traguito);
    }
    crear(nuevoTrago: Trago): Trago {
        nuevoTrago.id = this.recNum;
        this.recNum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }
    buscarPorId(id: number): Trago {
       return this.bddTragos.find((trago) => {
           return trago.id === id;
       });
    }
    buscarPorNombre(nombre: string): Trago {
        return this.bddTragos.find((trago) => {
            return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
        });
    }
    eliminarPorId(id: number): Trago[] {
        const indice = this.bddTragos.findIndex((trago) => {
            return trago.id === id
        });
        this.bddTragos.splice(indice,1 ); // borrar un elemento de un array, se pode desde que indice comienza a borrar y cuantos va a borrar
        return this.bddTragos;
    }
    actualizar(tragoActualizado: Trago, id: number): Trago[] {
        const indice = this.bddTragos.findIndex((trago) => {
            return trago.id === id
        });
        tragoActualizado.id = this.bddTragos[indice].id;
        return this.bddTragos;
    }
}