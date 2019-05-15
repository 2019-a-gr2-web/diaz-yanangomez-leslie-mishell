import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as cookieParser from 'cookie-parser';
import * as Joi from '@hapi/joi';
// const Joi = require('@hapi/joi');

@Controller ('/api') // Recibe como parametro un segmento inicial --> //localhost:3000/segmentoInicial
export class AppController {
    arregloUsuarios = [];
  constructor(private readonly appService: AppService) {}
@Get('/inicio') // EndPoint
getInicio(@Response() res) {
      return res.render('inicio.ejs', { estaVivo: true });
}
@Get('/peliculas')
getPeliculas (@Response() res){
      return res.render('peliculas/inicio.ejs'); // inidca el directorio donde se encuentra el archivo ejs, en este caso views/peliculas/arcchivo
}
@Get('/estilos')
getEstilos(@Response() res) {
      return res.render('peliculas/estilos.ejs');
}
  @Get('/hello-world') // Metodo HTTP (segmentoinicial)
  getHello(): string {
    return 'Hello World';
  }
  // otro get
    @Get('/adivina') // Metodo HTTP (segmentoinicial)
    getAdivina(@Headers() headers): string {
      // const Math.round(Math.random()*10)
        // Nunca usar var --> en ves de eso utilizamos let --> De preferencia utilizamos const
        /* const nombre = 'Leslie'; // String
        const edad = 21; // Number
        const sueldo = 1.2; // Decimal
        const casado = false; // Boolean
        const hijos = null; // null
        const alias = undefined; // undefined
        */
        console.log('Headers: ', headers); // Imprimir las cabeceras
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroCabecera = Number(headers.numero);
        if (numeroCabecera === numeroRandomico) {
            return 'OK';
        } else {
            return '>:(';
        }
    }
    @Get('/consulta')
    getConsulta(@Query() queryParams) {
      if (queryParams.nombre) {
          return `Hola ${queryParams.nombre}`;
      } else {
       return 'Hola Extraño';
      }
    }
    @Get('/ciudad/:idCiudad')
    // Nosotros definimos el nombre de la variable que el cliente va a enviar, se puede tener mas de un paramatro
    // de busqueda
    // separados con slash /:canton/:ciudad
    getCiudad(@Param() parametrosRuta) { // Son requeridos, si no se manda, no existe la ruta.
      switch (parametrosRuta.idCiudad.toLowerCase()) {
          case 'quito':
              return 'Que fueff';
          case 'guayaquil':
              return  'Que mah ñañoshh';
          default:
              return 'Buenas Tardes';
      }
    }
    @Post('/registroComida')
    postRegistroComida(@Body() parametrosCuerpo, @Response() response) { // Utilizado solamente para cierto tipo de parametros de cuerpo
      if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
          const cantidad = Number(parametrosCuerpo.cantidad);
          if (cantidad > 1) {
              response.set('Premio', 'Fanesca');
          }
          return response.send({mensaje: 'Registro Creado'});
      } else {
          return response.status(400).send({
              mensaje : 'ERROR, no envia nombre o cantidad',
              error : 404
          });
        }
      // console.log(parametrosCuerpo);
      // console.log(request.body);
    }
    // COOKIES
    @Get('/semilla')
    getSemilla(@Request() request, @Response() response) {
      // console.log(request.cookies);
      const cookies = request.cookies;
      const esquemaValidacionNumero = Joi.object().keys({
          numero: Joi.number().integer().required()
      });
      // const objetoValidacion = {
         // numero: cookies.numero
      // };
      // Joi.validate(objetoValidacion, esquemaValidacionNumero);
      const resultado = Joi.validate({
          numero: cookies.numero
      }, esquemaValidacionNumero);
      if (resultado.error) {
          console.log('Resultado', resultado);
      } else {
          console.log('Numero valido');
      }
      /* if (cookies.micookie) { // primero objeto a validar, despues el esquema
          const horaFechaServidor = new Date();
          const minutos = horaFechaServidor.getMinutes();
          horaFechaServidor.setMinutes(minutos + 1);
          response.cookie('fechaServidor', new Date().getTime(), {expires: horaFechaServidor, signed: true}); // nombre, valor --> cookie
          // return  response.send('OK');
      } else {
          // return response.send(':(');
      } */
      const cookieSegura = request.signedCookies.fechaServidor;
      if (!cookieSegura) {
            console.log('Cookie Segura');
            return  response.send('OK');
        } else {
            console.log('No es valida esa cookie');
            return  response.send(':(');
        }
    }
  // http:localhost:3000
  @Post('/hola-mundo') // Metodo HTTP
 // @HttpCode (200) // Codido HTTP a enviar
  postHello() {
    return 'Hola Mundo';
  }
  @Put('/anyeong-sesang')
    putHello() {
      return 'Anyeong Sesang';
  }
  @Delete('/bonjour-lemmon')
    deleteHello() {
      return 'Bonjour Lemmon';
  }
}
/*
Segmentos de accion:
1) GET 'hello-world'
2) POST 'hola-mundo'
3) PUT ''
4) DELETE ''
@NombreDecoradorClase() //Decorador --> Funcion
class usuario {
  @decoradorAtributo
  atributoPublico; // Si no se le asigna privado o protegido por defecto el atributo es publico
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro atributoPublic, @OtroParametro atributoPrivado, @OtroOtroParametro atributoProtected ){
    this.atributoPublico = atributoPublic;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido= atributoProtected;
  }
  @MetodoA()
  public metodoPublico(){}
  @MetodoB()
  private metodoPrivado(){}
  @MetodoC()
  protected metodoProtegido(){}
} */
/*
const json = [
    {
        llave: 'valor',
        key: 'value',
        nombre: 'Leslie'
    }
];
let leslie = 'Leslie';
const diaz: string = 'Diaz';
leslie = 1;

let objeto = [
  propiedad='valor', // valor1
  propiedadDos='valor2' // valor2
];
objeto.propiedad // valor1
objeto.propiedadDos // valor2
// Agregar propieades a un objeto json
objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'valor3';
// Eliminar una propiedad
delete objeto.propiedadTres
*/
// Variables ? const, let, var
// tipos de variables: string, number, boolean
function holaMundo() {
     console.log('Hola Mundo');
 }
 const resHM = holaMundo(); // cuando tenemos una funcion void en javascript, nos devuelve undefined
 console.log('Resp HM', resHM);
 function suma(a: number, b: number): number { // tipado de la funcion, ambos son numbers
     return a+b;
 }
 const resSuma = suma(4, 5);  // Respuesta 3
console.log('Resp suma:', resSuma);

// Condicionales
// Truty --> true
// Falsy --> false
if (true) {
    // Un string vacio "" es falsy, un string con mas de un caracter es truty
    // El 0 (no string) en JS es falsy, numeros positivos y negativos son truty
    // Undefined es falsy, null es falsy
    // Un objeto JSON vacio es Truty
    console.log('Verdadero "" ');
} else {
    console.log('Falso "" ');
}
// Operadores de arreglos JS
let arreglo = [
    function() {return 0; },
    1,
    'A',
    true,
    null,
    {},
    []];
// todas la variables en JS son de tipo any
const arregloNumeros = [1, 2, 3, 4, 5];
// 1) Imprima en consola todos los elementos
// ForEach
const arregloNumerosForEach = [1, 2, 3, 4, 5];
const rForEach = arregloNumerosForEach.forEach(function (valorActual, indice, arreglo) { // Las funciones JS que no tiene nombre se llaman funciones anonimas
    console.log(`Valor: ${valorActual}`);
    // console.log(`Indice: ${indice}`);
    // console.log(`Arreglo: ${arreglo}`);
});
console.log(`Respuesta FE: ${rForEach}`);
const r2ForEach = arregloNumerosForEach.forEach(n => console.log(`Valor: ${n}`)); // Las funciones JS que no tiene nombre se llaman funciones anonimas
// 2) Sumen 2 a los pares y 1 a los impares
const arregloNumerosMap = [1, 2, 3, 4, 5]; // Transformar o modificar al arreglo se lo conoce como Map
const rMap = arregloNumerosMap.map((valorActual) => {
    const esPar = valorActual % 2 === 0;
    if (esPar) {
        return valorActual + 2;
    } else {
        return valorActual + 1;
    }

}); // Se devuelve el new valor del elemento
console.log(`Respuesta MAP: ${rMap}`); // Devuelve el nuevo arreglo
// 3) Encuentre si hay #4
const arregloNumerosFind = [1, 2, 3, 4, 5];
const rFind = arregloNumerosFind.find( // Condicion para devolver el elemento
    (valorActual) => {
        return valorActual === 4;
    }
);
console.log(`Respuesta FIND: ${rFind}`); // Devuelve el elemento buscado, si existiense
// 4) Filtrar los numero menores a 5
const arregloNumerosFilter = [1, 2, 3, 4, 5]; // Filtrar elementos del arreglo, solo nos va a devolver un arreglo con aquellos elementos que cumplan una condicion
const rFilter = arregloNumerosFilter.filter( // Condicion true, agrega al arreglo, false, se omite del arreglo
    (valorActual) => {
        return valorActual < 5;
    }
);
console.log(`Respuesta FILTER: ${rFilter}`); // Devuelve un arreglo con los elementos buscados
// 5) Todos los valores son positivos? Si o No
const arregloNumerosEvery = [1, 2, 3, 4, 5];
const rEvery = arregloNumerosEvery.every( // Si todos cumplen, devuelvo true, si no false like a operador logico AND
    (valorActual) => {
        return valorActual > 0; // Condicion a evaluar
    }
);
console.log(`Respuesta EVERY: ${rEvery}`); // Devuelve, en este caso, true
// 6) Algun valor es menor que X=2
const arregloNumerosSome = [1, 2, 3, 4, 5];
const rSome = arregloNumerosSome.some( // Si todos no cumplen, devuelvo false, si alguno cumple devuelvo true like a operador logico OR
    (valorActual) => {
        return valorActual < 2; // Condicion a evaluar
    }
);
console.log(`Respuesta SOME: ${rSome}`); // Devuelve TRUE/FALSE
// 7) Sumar todos los valores
const arregloNumerosReduce = [1, 2, 3, 4, 5];
const acumuladoValor = 0; // Valor donde empieza el calculo
const rReduce = arregloNumerosReduce.reduce( // Dos parametros funcion, valor donde va a empezar el calculo
    (acumulado, valorActual) => {
        return acumulado + valorActual;
    }, acumuladoValor // df
);
console.log(`Respuesta REDUCE: ${rReduce}`); // Devuelve el acumulado
// 7.1 A los menores a 4 sumar 10% y +5, si es mayor igual, 15% +3
const arregloNumerosReduce2 = [1, 2, 3, 4, 5, 6];
const acumuladoValor2 = 0; // Valor donde empieza el calculo
const rReduce2 = arregloNumerosReduce2.reduce( // Dos parametros funcion, valor donde va a empezar el calculo
    (acumulado, valorActual) => {
        if (valorActual >= 4) {
            return acumulado + valorActual * 1.15 + 3;
        } else {
            return acumulado + valorActual * 1.10 + 5;
        }
    }, acumuladoValor2 // df
);
console.log(`Respuesta REDUCE2: ${rReduce2}`); // Devuelve el acumulado
// 8) Restar todos los valores de 100
const arregloNumerosReduce3 = [1, 2, 3, 4, 5, 6];
const acumuladoValor3 = 100; // Valor donde empieza el calculo
const rReduce3 = arregloNumerosReduce3.reduce( // Dos parametros funcion, valor donde va a empezar el calculo
    (acumulado, valorActual) => {
        return acumulado - valorActual;
    }, acumuladoValor3 // df
);
console.log(`Respuesta REDUCE3: ${rReduce3}`); // Devuelve el acumulado 79
// 1.1) Sumar 10 a todos
// 1.2 ) Filtrar los mayores a 15
// 1.3) Hay algun numero mayor a 30: true/false
const arregloEjercicio = [1, 2, 3, 4, 5, 6];
const respuesta = arregloEjercicio.map((valorActual) => {
    return valorActual + 10;
}).filter((valorActual) => {
    return valorActual > 15;
}).some((valorActual) => {
    return valorActual > 30;
});
console.log(`Respuesta: ${respuesta}`);
