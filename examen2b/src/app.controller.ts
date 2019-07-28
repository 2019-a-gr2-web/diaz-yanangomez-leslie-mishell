import {Body, Controller, Get, Header, Param, Post, Query, Req, Res} from '@nestjs/common';
import {ConductorService} from '../entities/conductor.service';

@Controller('/api')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly conductorService: ConductorService) {
  }

  @Get('/login')
  getLogin(@Res() res) {
    return res.render('login.ejs');
  }
}
  /*
  @Post('/login')
  postLogin(@Body() user: Usuario, @Res() res) {
    this.appService.crearUsuario(username);
 this.appService.regUsuario(user);
    res.cookie(user.id, user.username, { signed: true});
    return res.redirect('index/' + user.id);
  }
  @Post('/eliminarPelicula')
  postEliminarP(@Body('idPelicula') idPelicula: number, @Body('idActor') idActor: number, @Res() res, @Body('userid') userid: number
  ) {
    const id = Number(idPelicula);
    this.appService.eliminarPorIdPelicula(id);
    res.redirect( 'gestionPeliculas/' + userid + '/' + idActor);
  }
  @Post('/eliminarActor')
  postEliminarA(@Body('idActor') idActor: number, @Res() res, @Body('userid') userid: number
  ) {
    const id = Number(idActor);
    this.appService.eliminarPorIdActor(id);
    res.redirect( 'gestionActores/' + userid);
  }
  @Post('/buscarPelicula')
  postBuscarP(@Req() req, @Body('nombrePelicula') nombrePelicula: string,
              @Body('idActor') idActor: number, @Body('userid') useridd: number, @Res() res) {
    if  (!nombrePelicula) {
      res.redirect('/../api/gestionPeliculas/' + useridd + '/' + idActor);
    } else {
      const bdBuscar: Pelicula[] = this.appService.buscarPorNombreP(nombrePelicula);
      return res.render('listar-borrar-pel.ejs', {
        arregloPeliculas1: bdBuscar,
        idActor: idActor,
        username1: req.signedCookies[useridd],
        userid: useridd });
    }
  }
  @Post('/buscarActor')
  postBuscarA(@Body('nombreActor') nombreActor: string, @Res() res, @Req() req, @Body('userid') useridd: number
  ) {
    if  (!nombreActor) {
      return res.redirect('/../api/gestionActores/' + useridd);
    } else {
      const bdBuscar: Actor[] = this.appService.buscarPorNombreA(nombreActor);
      return res.render('listar-borrar-act.ejs', {arregloActores1: bdBuscar, username1: req.signedCookies[useridd], userid: useridd });
    }
  }
  @Post('/nuevaPelicula')
  postNP(@Res() res, @Body() pelicula: Pelicula, @Body('userid') userid: number) {
    pelicula.anioLanzamiento = Number(pelicula.anioLanzamiento);
    pelicula.idActor = Number(pelicula.idActor);
    pelicula.rating = Number(pelicula.rating);
    this.appService.regPelicula(pelicula);
    res.redirect('gestionPeliculas/' + userid + '/' + pelicula.idActor);
  }
  @Get('/nuevaPelicula/:userid/:idActor') // EndPoint
  getNP(@Res() res, @Param() par, @Req() req) {
    this.cookieSegura(res, req.signedCookies[par.userid], par.userid);
    return res.render('crear-pelicula.ejs', {idActor: par.idActor, username1: req.signedCookies[par.userid], userid: par.userid});
  }
  @Post('/nuevoActor')
  postNA(@Res() res, @Body() actor: Actor, @Body('retirado') retirado: string, @Body('userid') userid: number) {
    actor.fechaNacimiento = new Date(actor.fechaNacimiento);
    actor.numeroPeliculas = Number(actor.numeroPeliculas);
    actor.retirado = retirado.toLowerCase() === 'true';
    this.appService.regActor(actor);
    res.redirect('gestionActores/' + userid);
  }
  @Get('/nuevoActor/:userid') // EndPoint
  getNA(@Res() res, @Req() req, @Param() par) {
    this.cookieSegura(res, req.signedCookies[par.userid], par.userid);
    return res.render('crear-actor.ejs', { username1: req.signedCookies[par.userid], userid: par.userid});
  }
  @Get('/index/:userid') // EndPoint
  getIndex(@Res() res, @Req() req, @Param() par) {
    // this.appService.comprobarCookieBuena(req, res);
    this.cookieSegura(res, req.signedCookies[par.userid], par.userid);
    return res.render('gestionarp.ejs', {username1: req.signedCookies[par.userid], userid: par.userid});
  }
  @Get('/salir/:userid') // EndPoint
  getSalir(@Res() res, @Param() par) {
    this.appService.eliminarUsuario(par.userid);
    return res.clearCookie(par.userid).redirect('/../api/login');
  }
  @Get('/gestionActores/:userid') // EndPoint
  getGA(@Res() res, @Req () req, @Param() par) {
    // this.appService.comprobarCookieBuena(req,req.cookie[],res);
    this.cookieSegura(res, req.signedCookies[par.userid], par.userid);
    const arregloActores = this.appService.bdActores;
    return res.render('listar-borrar-act.ejs', {arregloActores1: arregloActores, username1: req.signedCookies[par.userid], userid: par.userid});
  }
  @Get('/gestionPeliculas/:userid/:idActor') // EndPoint
  getGP(@Res() res, @Param() par, @Req() req) {
    this.cookieSegura(res, req.signedCookies[par.userid], par.userid);
    const arregloPeliculas = this.appService.peliculasdDe(par.idActor);
    return res.render('listar-borrar-pel.ejs', {
      arregloPeliculas1: arregloPeliculas,
      idActor: par.idActor,
      username1: req.signedCookies[par.userid],
      userid: par.userid });
  }
  cookieSegura(@Res() res, cookiename: string, userid: number) {
    if (!cookiename) {
      return res.redirect('/../api/salir/' + userid);
    }
  }

}
*/
