import {Controller, Delete, Get, HttpCode, Post, Put, Headers} from '@nestjs/common';
import { AppService } from './app.service';

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
        if (numeroCabecera == numeroRandomico) {
            return 'OK';
        } else {
            return '>:(';
        }
        return 'OK';
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