import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Query, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}
// Deber parte 1
  @Get('/newUsuario')
  @HttpCode(200)
  getUsuario(@Query() queryParams, @Request() request, @Response() response) {
    const cookies = request.cookies;
    const esquemaValidacionUserName = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(12).required()
    });
    const alloweduname = Joi.validate({
      username: queryParams.username
    }, esquemaValidacionUserName);
    if (alloweduname.error) {
      response.status(400).send({ error: 'El nombre de usuario debe ser alfanumerico de min 6 y max 12 caracteres'});
    } else {
      const user = queryParams.username;
      if (!cookies[user]) {
          const valuec = Math.round(Math.random() * 10);
        response.cookie(user, valuec); // nombre, valor --> cookie
        response.send({ nombreUsuario: user, resultado: valuec});
    } else {
        return response.send({
            mensaje: 'Tu cookie ya ha sido creada :)',
            nombreUsuario: user,
            resultado: cookies[user] });
      }
    }

}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/suma')
  @HttpCode(200)
  getSuma(@Headers() cabecera): string {
    if (cabecera.numero1 && cabecera.numero2) {
      const numero1 = Number(cabecera.numero1);
      const numero2 = Number(cabecera.numero2);
      return `La suma es ${numero1 + numero2}`;
    } else {
      return 'No  existen parametros para sumar :(';
    }
  }
  @Post('/resta')
  @HttpCode(201)
  postResta(@Body() parametrosCuerpo, @Response() response) {
    if (parametrosCuerpo.numero1 && parametrosCuerpo.numero2) {
      const numero1 = Number(parametrosCuerpo.numero1);
      const numero2 = Number(parametrosCuerpo.numero2);
      const resta = numero1 - numero2;
      response.set('resultadoresta', resta);
      return response.send({resultadoResta: resta });
    } else {
      return response.status(401).send ({error: 'No existen parametros para restar :/'});
    }
  }
  @Put('/multiplica')
  @HttpCode(202)
  putMultiplica(@Query() consulta) {
    if (consulta.numero1 && consulta.numero2) {
      const numero1 = Number(consulta.numero1);
      const numero2 = Number(consulta.numero2);
      return `La multiplicación es ${numero1 * numero2}`;
    } else {
      return 'No escribiste parametros para multiplicar :(';
    }
  }
  @Delete('/division')
  @HttpCode(203)
  deleteDivision(@Query() consulta, @Body() cuerpo, @Response() response, @Headers() cabecera) {
    let numero1;
    let numero2;
    if (consulta.numero1 && consulta.numero2) {
      numero1 = Number(consulta.numero1);
      numero2 = Number(consulta.numero2);
    } else if (cabecera.numero1 && cabecera.numero2) {
      numero1 = Number(cabecera.numero1);
      numero2 = Number(cabecera.numero2);
    } else if (cuerpo.numero1 && cuerpo.numero2) {
      numero1 = Number(cuerpo.numero1);
      numero2 = Number(cuerpo.numero2);
    } else {
      return response.status(403).send('No existen parametros para dividir :(');
    }
    if (numero2 !== 0) {
      const division = numero1 / numero2;
      // response.set('resultadodivision', division);
      return response.send(`El resultado de la division es ${division}`);
    } else {
      return response.status(403).send('No existe division para cero :/');
    }
    /*
    const n1 = Number(consulta.numero1);
    const n2 = Number(cabecera.numero2);
    if (n1 && n2 && n2 !== 0) {
      const div = n1 / n2;
      return response.send(`El resultado de la division es ${div}`);
    } else {
      return response.status(403).send('No existen parametros para dividir o el divisor es cero :/');
    }
    */
  }
}