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
  getSuma(@Headers() cabecera, @Response() res, @Request() req) {
    const cookies = req.signedCookies;
    const usuarioActual = cabecera.usuario;
    let resultado;
    if (!cookies[usuarioActual]) {
      res.cookie(usuarioActual, 100, {signed: true});
      resultado = 100;
    } else {
      resultado = cookies[usuarioActual];
    }
    // Begin Suma
    if (cabecera.numero1 && cabecera.numero2) {
      const comprobar =  this.comprobarNumber(cabecera.numero1, cabecera.numero2);
      if (!comprobar) {
        res.status(400).send({ error: 'Ingrese solo dos números enteros'});
      } else {
        const suma = Number(cabecera.numero1) + Number(cabecera.numero2);
        resultado = resultado - suma;
        res.cookie(usuarioActual, resultado, {signed: true});
        if ( resultado > 0) {
          res.send({ respuesta: `La suma es ${suma}`});
        } else {
          res.send({ nombreUsuario: usuarioActual, respuesta: resultado, mensaje: 'Se acabaron tus puntos'});
        }
      }
    } else {
      res.status(400).send({ error: 'No  existen parametros para sumar :('});
    }
    // End Suma
  }
  // Validacion de numeros
  comprobarNumber(a, b): boolean {
    const esquemaValidacionNumero = Joi.object().keys({ numero: Joi.number().integer().required()});
    const allowedNumber1 = Joi.validate({numero: a}, esquemaValidacionNumero);
    const allowedNumber2 = Joi.validate({numero: b}, esquemaValidacionNumero);
    if (allowedNumber1.error || allowedNumber2.error) {
      return false;
    } else {
      return true;
    }
  }
  @Post('/resta')
  @HttpCode(201)
  postResta(@Body() parametrosCuerpo, @Response() res, @Request() req) {
    const cookies = req.signedCookies;
    const usuarioActual = parametrosCuerpo.usuario;
    let resultado;
    if (!cookies[usuarioActual]) {
      res.cookie(usuarioActual, 100, {signed: true});
      resultado = 100;
    } else {
      resultado = cookies[usuarioActual];
    }
    // Begin Resta
    if (parametrosCuerpo.numero1 && parametrosCuerpo.numero2) {
      const comprobar =  this.comprobarNumber(parametrosCuerpo.numero1, parametrosCuerpo.numero2);
      if (!comprobar) {
        res.status(401).send({ error: 'Ingrese solo dos números enteros'});
      } else {
        const resta = Number(parametrosCuerpo.numero1) - Number(parametrosCuerpo.numero2);
        resultado = resultado - resta;
        res.cookie(usuarioActual, resultado, {signed: true});
        if ( resultado > 0) {
          res.send({ respuesta: `La resta es ${resta}`});
        } else {
          res.send({ nombreUsuario: usuarioActual, respuesta: resultado, mensaje: 'Se acabaron tus puntos'});
        }
      }
    } else {
      res.status(401).send({ error: 'No  existen parametros para restar :('});
    }
  }
  @Put('/multiplica')
  @HttpCode(202)
  putMultiplica(@Query() consulta, @Request() req, @Response() res) {
    const cookies = req.signedCookies;
    const usuarioActual = consulta.usuario;
    let resultado;
    if (!cookies[usuarioActual]) {
      res.cookie(usuarioActual, 100, {signed: true});
      resultado = 100;
    } else {
      resultado = cookies[usuarioActual];
    }
    // Begin Multiplicacion
    if (consulta.numero1 && consulta.numero2) {
      const comprobar =  this.comprobarNumber(consulta.numero1, consulta.numero2);
      if (!comprobar) {
        res.status(402).send({ error: 'Ingrese solo dos números enteros'});
      } else {
        const mult = Number(consulta.numero1) * Number(consulta.numero2);
        resultado = resultado - mult;
        res.cookie(usuarioActual, resultado, {signed: true});
        if ( resultado > 0) {
          res.send({ respuesta: `La multiplicacion es ${mult}`});
        } else {
          res.send({ nombreUsuario: usuarioActual, respuesta: resultado, mensaje: 'Se acabaron tus puntos'});
        }
      }
    } else {
      res.status(402).send({ error: 'No  existen parametros para sumar :('});
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