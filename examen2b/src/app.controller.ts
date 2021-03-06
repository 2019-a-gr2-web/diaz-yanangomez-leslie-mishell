import {Body, Controller, Get, Header, Param, Post, Query, Req, Res, Session} from '@nestjs/common';
import {ConductorService} from '../entities/conductor.service';
import {UsuarioService} from '../entities/usuario.service';
import {AutoService} from '../entities/auto.service';
import {PedidoService} from '../entities/pedido.service';
import {Auto} from '../interfaces/auto';
import {AutoCreateDto} from '../dto/auto.create.dto';
import {validate} from 'class-validator';
import {AutoUpdateDto} from '../dto/auto.update.dto';
import {CarritoGateway} from './carrito/carrito.gateway';
import {DetalleService} from "../entities/detalle.service";
import {Pedido} from "../interfaces/pedido";
import {Detalle} from "../interfaces/detalle";
import {DetalleEntity} from "../entities/detalle.entity";


@Controller('/api')
export class AppController {
    constructor(private readonly conductorService: ConductorService, private readonly usuarioService: UsuarioService,
                private readonly autoService: AutoService, private readonly pedidoService: PedidoService,
                private readonly carritoGateway: CarritoGateway, private readonly detalleService: DetalleService) {
    }

    @Get('/login')
    getLogin(@Res() res, @Query() q) {
        return res.render('login.ejs', {mensaje: q.m});
    }
    @Post('/login')
    async postLogin(@Body('rolId') rolid: number, @Body('username') username: string, @Body('password') password: string, @Res() res, @Session() ses) {
        const user = await this.usuarioService.verificarPassword(username, rolid);
        if (user !== undefined) {
            if (username === user.username && password === user.password) {
                ses.username = user.nombreApellido;
                ses.userid = user.usuarioId;
                ses.rolId = user.rolId;
                if (Number(ses.rolId) === 2) {
                    res.redirect('/api/pedidos/' + ses.userid);
                } else {
                    res.redirect('/api/index/' + user.usuarioId);
                }
            } else {
                res.redirect('/api/login?m=Error');
            }
        } else {
            res.status(400);
            res.send({mensaje: 'Error Login', error: 400});
        }

    }

    @Get('/salir/:userid') // EndPoint
    getSalir(@Res() res, @Param() par, @Session() ses) {
        ses.username = undefined;
        ses.userid = undefined;
        ses.destroy();
        res.redirect('/api/login');
    }

    @Get('/index/:userid') // EndPoint
    async getIndex(@Res() res, @Req() req, @Param() par, @Session() session) {
        console.log(Number(session.userid) === Number(par.userid));
        console.log(session.username + par.userid);
        if (session.username && (Number(session.userid) === Number(par.userid))) {
            const usuario = await this.usuarioService.buscarPorId(par.userid);
            return res.render('gestionarp.ejs', {
                username1: usuario.nombreApellido,
                userid: par.userid,
                rolid: session.rolId
            });
        } else {
            return res.redirect('/api/login');
        }
    }

    @Get('/gestionPadres/:userid') // EndPoint
    async getGA(@Res() res, @Req() req, @Param() par, @Session() ses) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            const arregloPadres = await this.conductorService.getConductores();
            // console.log(arregloPadres);
            return res.render('listar-borrar-act.ejs', {
                arregloPadres1: arregloPadres,
                username1: ses.username,
                userid: par.userid,
                rolid: ses.rolId
            });
        } else {
            return res.redirect('/api/login');
        }
    }

    @Get('/gestionHijos/:userid/:conductorId') // EndPoint
    async getGP(@Res() res, @Param() par, @Req() req, @Session() ses, @Query('mensaje') mensaje1: string) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            const arregloHijos = await this.autoService.getAutos(Number(par.conductorId));
            // const pedidoActual = await this.pedidoService.pedidoActivoPorUsuario(Number(ses.userid));
            // console.log(arregloHijos);
            return res.render('listar-borrar-pel.ejs', {
                arregloHijos1: arregloHijos,
                conductorId: par.conductorId,
                username1: ses.username,
                userid: par.userid,
                rolid: ses.rolId,
                mensaje: mensaje1,
            });
        } else {
            return res.redirect('/api/login');
        }
    }

//Cambiar Aqui
    @Post('/buscarHijo')
    async postBuscarP(@Req() req, @Session() ses, @Body('parametro') parametro: string, @Body('busqueda') busqueda: string,
                      @Body('conductorId') conductorid: number, @Body('userid') useridd: number, @Res() res) {
        if (!parametro) {
            res.redirect('/../api/gestionHijos/' + useridd + '/' + conductorid);
        } else {
            if (busqueda === 'chasis') {
                if (!Number(parametro)) {
                    const para: number = -1;
                    const bdBuscar = await this.autoService.buscarPorChasis(para);
                    return res.render('listar-borrar-pel.ejs', {
                        arregloHijos1: bdBuscar,
                        conductorId: conductorid,
                        username1: ses.username,
                        userid: useridd,
                        rolid: ses.rolId,
                    });
                } else {
                    const bdBuscar = await this.autoService.buscarPorChasis(Number(parametro));
                    return res.render('listar-borrar-pel.ejs', {
                        arregloHijos1: bdBuscar,
                        conductorId: conductorid,
                        username1: ses.username,
                        userid: useridd,
                        rolid: ses.rolId
                    });
                }
            } else if (busqueda === 'color') {
                const bdBuscar = await this.autoService.buscarPorColor(parametro);
                return res.render('listar-borrar-pel.ejs', {
                    arregloHijos1: bdBuscar,
                    conductorId: conductorid,
                    username1: ses.username,
                    userid: useridd,
                    rolid: ses.rolId
                });
            } else {
                res.redirect('/../api/gestionHijos/' + useridd + '/' + conductorid);
            }
        }
    }

    @Post('/eliminarHijo')
    async postEliminarP(@Body('autoId') autoid: number, @Session() ses, @Body('conductorId') conductorid: number, @Res() res, @Body('userid') userid: number
    ) {
        await this.autoService.eliminarAutoPorId(Number(autoid));
        res.redirect('gestionHijos/' + userid + '/' + conductorid);
    }

    @Post('/nuevoHijo')
    async postNP(@Res() res, @Body() auto: Auto, @Body('userid') userid: number, @Session() ses) {
        auto.chasis = Number(auto.chasis);
        auto.anio = Number(auto.anio);
        auto.conductorId = Number(auto.conductorId);
        auto.precio = Number(auto.precio);
        let autoAValidar = new AutoCreateDto();
        autoAValidar.chasis = auto.chasis;
        autoAValidar.nombreMarca = auto.nombreMarca;
        autoAValidar.colorUno = auto.colorUno;
        autoAValidar.colorDos = auto.colorDos;
        autoAValidar.nombreModelo = auto.nombreModelo;
        autoAValidar.anio = auto.anio;
        autoAValidar.precio = auto.precio;
        autoAValidar.conductorId = auto.conductorId;
        try {
            const respValidacionErrors = await validate(autoAValidar);
            if (respValidacionErrors.length > 0) {
                //console.error(respValidacionErrors); // jjk
                res.redirect('../api/nuevoHijo/' + userid + '/' + auto.conductorId + '?mensaje=Revisa que los campos no esten vacios y sean datos permitidos :)'); // hhjgj
            } else {
                await this.autoService.crearAuto(auto);
                res.redirect('../api/gestionHijos/' + userid + '/' + auto.conductorId);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }

    }

    @Get('/nuevoHijo/:userid/:conductorId') // EndPoint
    getNP(@Res() res, @Param() par, @Req() req, @Session() ses, @Query() query) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            return res.render('crear-pelicula.ejs', {
                conductorId: par.conductorId,
                username1: ses.username, userid: par.userid, mensaje1: query.mensaje, rolid: ses.rolId,
            });
        } else {
            return res.redirect('/api/login');
        }
    }

    @Get('/modificarHijo/:userid/:conductorId/:autoId') // EndPoint
    async getMP(@Res() res, @Param() par, @Req() req, @Session() ses, @Query() query) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            const auto = await this.autoService.buscarPorId(par.autoId);
            return res.render('modificar-pelicula.ejs', {
                conductorId: par.conductorId,
                username1: ses.username,
                userid: par.userid,
                mensaje1: query.mensaje,
                hijo: auto,
                rolid: ses.rolId
            });
        } else {
            return res.redirect('/api/login');
        }
    }

    @Get('/carrito/:userid') // EndPoint
    async getCarrito(@Res() res, @Param() par, @Req() req, @Session() ses) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            const usuario = await this.usuarioService.buscarPorId(par.userid);
            const pedido = await this.pedidoService.pedidoActivoPorUsuario(ses.userid);
            // let detalles: DetalleEntity[];
            let autosInfo;
            console.log(pedido);
            if (pedido !== undefined) {
                // detalles = await this.detalleService.getDetallesPorPedido(pedido.pedidoId);
                autosInfo = await this.autoService.getAutosEnPedido(pedido.pedidoId);
                console.log(autosInfo);
            } else {
                // detalles = undefined;
                autosInfo = undefined;
            }
            // console.log(detalles);
            return res.render('micarrito.ejs', {
                usuario1: usuario,
                pedido1: pedido,
                autosInfo1: autosInfo,
                // detalles1: detalles,
                rolid: ses.rolId
            });
        } else {
            return res.redirect('/api/login');
        }
    }

    @Post('/eliminarDelCarrito')
    async postEC(@Body('autoId') autoid: number, @Body('pedidoId') pedidoid: number, @Session() ses, @Res() res) {
        await this.detalleService.eliminarDelCarrito(autoid, pedidoid);
        res.redirect('/../api/carrito/' + ses.userid);
    }

    @Post('/cancelado')
    async postC(@Res() res, @Session() ses, @Body('pedidoId') pedidoId: number) {
        await this.pedidoService.cancelarPedido(pedidoId);
        res.redirect('/../api/gestionPadres/' + ses.userid);
    }

    @Post('/comprado')
    async postCom(@Res() res, @Session() ses, @Body('pedidoId') pedidoId: number) {
        await this.pedidoService.comprarPedido(pedidoId);
        res.redirect('/../api/gestionPadres/' + ses.userid);
    }
    @Get('/pedidos/:userid')
    async getPedidos(@Res() res, @Session() ses, @Param() par) {
        if (ses.username && (Number(ses.userid) === Number(par.userid))) {
            if ( ses.rolId === 1) {
                const pedido = await this.pedidoService.pedidosPorUsuario(ses.userid);
                return res.render('pedidos.ejs', {pedidos1: pedido, userid: ses.userid, rolid: ses.rolId});
            } else {
                const pedidos = await this.pedidoService.getPedidos();
                return res.render('pedidos.ejs', {pedidos1: pedidos, userid: ses.userid, rolid: ses.rolId});
            }
        } else {
            return res.redirect('/api/login');
        }
    }
    @Post('/despachar')
    async postD(@Res() res, @Session() ses, @Body('pedidoId') pedidoId: number) {
        await this.pedidoService.despacharPedido(pedidoId);
        res.redirect('/../api/pedidos/' + ses.userid);
    }

    @Post('/modificarHijo')
    async postMP(@Res() res, @Body() auto: Auto, @Body('userid') userid: number) {
        auto.chasis = Number(auto.chasis);
        auto.anio = Number(auto.anio);
        auto.conductorId = Number(auto.conductorId);
        auto.autoId = Number(auto.autoId);
        auto.precio = Number(auto.precio);
        let autoAValidar = new AutoUpdateDto();
        autoAValidar.colorUno = auto.colorUno;
        autoAValidar.colorDos = auto.colorDos;
        autoAValidar.precio = auto.precio;
        try {
            const respValidacionErrors = await validate(autoAValidar);
            if (respValidacionErrors.length > 0) {
                // console.log(respValidacionErrors);
                res.redirect('../api/modificarHijo/' + userid + '/' + auto.conductorId + '/' + auto.autoId + '?mensaje=Revisa que los campos no esten vacios y sean datos permitidos :)'); // hhjgj
            } else {
                await this.autoService.actualizarAuto(auto);
                res.redirect('../api/gestionHijos/' + userid + '/' + auto.conductorId);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }

    }
    @Post('/actPD')
    async postACTPD(@Res() res, @Body('autoid') autoid: number, @Body('precio') precio: number,
                    @Body('cantidad') cantidad: number, @Body('pedidoId') pedidoId: number, @Session() ses) {
        const ped = await this.pedidoService.pedidoActivoPorUsuario(ses.userid);
        const det = await this.detalleService.buscarProductoEnDetalle(ped.pedidoId, autoid);
        det.cantidad = cantidad;
        await this.detalleService.masProducto(det);
        await this.pedidoService.updateTotal(ped, (precio * cantidad));
        await this.detalleService.masProducto(det);
        return res.redirect('/../api/gestionHijos/' + 1 + '/' + 1);
    }

    @Post('/anadirCarrito')
    async postAC(@Res() res, @Body('autoId') autoid: number, @Body('precio') precio: number,
                 @Body('conductorId') conductorid: number, @Body('usuarioId') usuarioid: number) {
        const ped = await this.pedidoService.pedidoActivoPorUsuario(usuarioid);
        console.log(ped);
        if (ped === undefined) {
            const pedido: Pedido = {
                estadoPedido: 'Activo',
                totalSinImpuestos: precio,
                totalConImpuestos: precio * 1.12,
                usuarioId: usuarioid,
            };
            const ped1 = await this.pedidoService.crearPedido(pedido);
            const det = await this.detalleService.buscarProductoEnDetalle(ped1.pedidoId, autoid);
            if (det === undefined) {
                const detalle: Detalle = {
                    cantidad: 1,
                    pedidoId: ped1.pedidoId,
                    autoId: autoid,
                };
                await this.detalleService.nuevoDetalle(detalle);
            } else {
                det.cantidad = det.cantidad + 1;
                await this.detalleService.masProducto(det);
            }
        } else {
            await this.pedidoService.updateTotal(ped, precio);
            const det = await this.detalleService.buscarProductoEnDetalle(ped.pedidoId, autoid);
            if (det === undefined) {
                const detalle: Detalle = {
                    cantidad: 1,
                    pedidoId: ped.pedidoId,
                    autoId: autoid,
                };
                await this.detalleService.nuevoDetalle(detalle);
            } else {
                det.cantidad = det.cantidad + 1;
                await this.detalleService.masProducto(det);
            }
        }
        return res.redirect('/../api/gestionHijos/' + usuarioid + '/' + conductorid);
    }
}

/*
/*
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
