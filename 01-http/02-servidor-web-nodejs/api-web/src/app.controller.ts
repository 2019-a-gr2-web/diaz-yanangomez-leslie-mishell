import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as cookieParser from 'cookie-parser';
import * as Joi from '@hapi/joi';
// const Joi = require('@hapi/joi');

@Controller ('/api') // Recibe como parametro un segmento inicial --> //localhost:3000/segmentoInicial
export class AppController {
  constructor(private readonly appService: AppService) {}
@Get('/inicio')
getInicio(@Response() res) {
      return res.render('inicio.ejs');
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
let arreglo = [ function fun() {return 0; }, 1, 'A', true, null, {}, []]; // todas la variables en JS son de tipo any
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
const arregloNumerosMap = [1, 2, 3, 4, 5]; // Transformar al arreglo se lo conoce como Map
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
const arregloNumerosFilter = [1, 2, 3, 4, 5];
const rFilter = arregloNumerosFilter.filter( // Condicion true, agrega al arreglo, false, se omite del arreglo
    (valorActual) => {
        return valorActual < 5;
    }
);
console.log(`Respuesta FILTER: ${rFilter}`); // Devuelve un arreglo con los elementos buscados
// 5) Todos los valores positivos
// 6) Algun valor es menor que 2
// 7) Sumar todos los valores
// 8) Restar todos los valores de 100
// 1.1) Sumar 10 a todos
// 1.2 ) Filtrar los mayores a 15
// 1.3) Hay algun numero mayor a 30: true/false
