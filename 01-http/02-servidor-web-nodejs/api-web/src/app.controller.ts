import {Controller, Get, HttpStatus, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Metodo HTTP

  getHello(): string {
    return this.appService.getHello();
  }
  @Post() // Metodo HTTP
  // @HttpStatus(200) // Codido HTTP a enviar
  postHello() {
    return 'Hola mundo en post';
  }
}

/*
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
}*/
