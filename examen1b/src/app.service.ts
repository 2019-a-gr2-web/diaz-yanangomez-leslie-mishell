import {Injectable, Request, Res} from '@nestjs/common';
import {Pelicula} from '../interfaces/pelicula';
import {Actor} from '../interfaces/actor';
import {Usuario} from "../interfaces/usuario";
@Injectable()
export class AppService {
  bdActores: Actor [] = [];
  bdPeliculas: Pelicula [] = [];
  bdUsuarios: Usuario [] = [];
  registroA = 1;
  registroP = 1;
  registroU = 1;
  regUsuario(nuevoUsuario: Usuario): Usuario {
        nuevoUsuario.id = this.registroU;
        this.registroU++;
        this.bdUsuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }
  eliminarUsuario(id: number) {
        const indU = this.bdUsuarios.findIndex((user) => {
            return user.id === id
        });
        this.bdUsuarios.splice(indU,1 );
  }
  constructor() {
    const actor: Actor = {
      nombres: 'Eddie',
      apellidos: 'Redmayne',
      fechaNacimiento: new Date(1982, 1, 6 ),
      numeroPeliculas: 20,
      retirado: false
    };
    this.regActor(actor);
    const pelicula: Pelicula = {
      nombre: 'La Chica Danesa',
    anioLanzamiento: 2015,
    rating: 7,
    actoresPrincipales: 'Eddie Redmayne, Amber Heard, Alicia Vikander',
      sinopsis: 'El pintor Einar Wegener descubre que se siente mujer y, con el apoyo y ' +
          'ayuda de su esposa, se convierte en uno de los primeros casos en la historia en someterse a una cirugía de ' +
          'cambio de sexo. Una historia real en donde el amor dentro un matrimonio se dirige a la búsqueda de la identidad ' +
          'de género de Einar.',
    idActor: 1
    };
    this.regPelicula(pelicula);
  }

  regActor(nuevoActor: Actor): Actor {
    nuevoActor.idActor = this.registroA;
    this.registroA++;
    this.bdActores.push(nuevoActor);
    return nuevoActor;
  }
  regPelicula(nuevaPelicula: Pelicula): Pelicula {
    nuevaPelicula.idPelicula = this.registroP;
    this.registroP++;
    this.bdPeliculas.push(nuevaPelicula);
    return nuevaPelicula;
  }
  eliminarPorIdActor(id: number): Actor[] {
    const indA = this.bdActores.findIndex((actor) => {
      return actor.idActor === id
    });
    this.eliminarPeliculasDeActor(id);
    this.bdActores.splice(indA,1 ); // borrar un elemento de un array, se pode desde que indice comienza a borrar y cuantos va a borrar
    return this.bdActores;
  }
  eliminarPorIdPelicula(id: number): Pelicula[] {
    const indP = this.bdPeliculas.findIndex((pelicula) => {
      return pelicula.idPelicula === id
    });
    this.bdPeliculas.splice(indP,1 ); // borrar un elemento de un array, se pode desde que indice comienza a borrar y cuantos va a borrar
    return this.bdPeliculas;
  }
  eliminarPeliculasDeActor(idActor: number) {
    this.peliculasdDe(idActor).forEach(pelicula => {
        this.eliminarPorIdPelicula(pelicula.idPelicula);
    });
  }

  peliculasdDe(idActor: number): Pelicula[] {
    const idA = Number(idActor);
    return this.bdPeliculas.filter(pelicula => {
      return pelicula.idActor === idA
      });
  }
  buscarPorNombreP(nombre: string): Pelicula[] {
    return this.bdPeliculas.filter((pelicula) => {
      return pelicula.nombre.toUpperCase().includes(nombre.toUpperCase());
    });
  }
    buscarPorNombreA(nombre: string): Actor[] {
        return this.bdActores.filter((actor) => {
            const nomape = actor.nombres + ' ' + actor.apellidos;
            return actor.nombres.toUpperCase().includes(nombre.toUpperCase()) ||
                actor.apellidos.toUpperCase().includes(nombre.toUpperCase()) ||
                nomape.toUpperCase().includes(nombre.toUpperCase())
        });
    }
  getHello(): string {
    return 'Hello World!';
  }
  // comprobarCookieBuena(@Request() req, @Res () res) {
  //     const cookie = req.signedCookies[this.username];
  //     if (cookie) {
  //         res.clearCookie(this.username);
  //         res.redirect('/../api/login');
  //     }
  // }
}
