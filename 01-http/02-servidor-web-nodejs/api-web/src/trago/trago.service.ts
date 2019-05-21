import {Injectable} from '@nestjs/common';
import {Trago} from './interfaces/trago';

@Injectable()
export class TragoService {
    bddTragos: Trago [] = [];
    recNum = 1;
    crear(nuevoTrago: Trago) {
        nuevoTrago.id = this.recNum;
        this.recNum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }
    buscarPorId(id: number) {
       this.bddTragos.find((trago) => {
           return trago.id === id;
       });
    }
    eliminarPorId(id: number) {
        const indice = this.bddTragos.findIndex((trago) => {
            return trago.id === id
        });
        this.bddTragos.splice(id,1); // borrar un elemento de un array, se pode desde que indice comienza a borrar y cuantos va a borrar
        return this.bddTragos;
    }
    actualizar(tragoActualizado: Trago, id: number) {
        const indice = this.bddTragos.findIndex((trago) => {
            return trago.id === id
        });
        tragoActualizado.id = this.bddTragos[indice].id;
    }
}