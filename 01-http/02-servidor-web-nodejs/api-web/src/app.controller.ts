import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import {} from 'cookie-parser';

@Controller ('/api') // Recibe como parametro un segmento inicial --> //localhost:3000/segmentoInicial
export class AppController {
  constructor(private readonly appService: AppService) {}

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
          return 'Hola' + queryParams.nombre;
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
              response.send('Premio,Fanesca' );
          }
          return 'Registro Creado';
      } else {
          return response.status(400).send({
              mensaje : 'ERROR, no envia nombre o cantidad',
              error : 404,
          });
        }
      // console.log(parametrosCuerpo);
      // console.log(request.body);
    }
    @Get('/semilla')
    getSemilla(@Request() request) {
      console.log(request.cookies);
      const cookiee = request.cookies;
      if (cookiee.micookie) {
          return  'OK';
      } else {
          return ':(';
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
