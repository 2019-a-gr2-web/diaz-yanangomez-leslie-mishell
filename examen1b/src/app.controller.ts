import {Body, Controller, Get, Header, Param, Post, Query, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  getLogin(@Res() res) {
    return res.render('login.ejs');
  }
  @Post('/login')
  postLogin(@Body('username') username: string) {
    // crea una cookie segura

  }
  @Post('/eliminarPelicula')
  postEliminarP(@Body('idPelicula') idPelicula: number, @Body('idActor') idActor: number, @Res() res
  ) {
    const id = Number(idPelicula);
    this.appService.eliminarPorIdPelicula(id);
    res.redirect( 'gestionPeliculas/' + idActor);
  }
  @Post('/buscarPelicula')
  postBuscarP(@Body('nombrePelicula') nombrePelicula: number, @Body('idActor') idActor: number, @Res() res
  ) {
    // Falta
  }
  @Get('/nuevaPelicula/:idActor') // EndPoint
  getNP(@Res() res, @Param() param) {
    return res.render('crear-pelicula.ejs', {idActor: param.idActor});
  }
  @Get('/gestionActores') // EndPoint
  getGA(@Res() res) {
    const arregloActores = this.appService.bdActores;
    return res.render('listar-borrar-act.ejs', {arregloActores1: arregloActores});
  }
  @Get('/gestionPeliculas/:idActor') // EndPoint
  getGP(@Res() res, @Param() query) {
    console.log(query.idActor);
    const arregloPeliculas = this.appService.peliculasdDe(query.idActor);
    console.log(arregloPeliculas);
    return res.render('listar-borrar-pel.ejs', {arregloPeliculas1: arregloPeliculas, idActor: query.idActor });
  }
}
