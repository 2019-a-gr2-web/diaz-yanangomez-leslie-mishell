import {Body, Controller, Get, Post, Response} from '@nestjs/common';
import {TragoService} from './trago.service';
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragoController {
    // Injeccion de Dependencias
    constructor(private readonly tragosService: TragoService) {
    } // Guion bajo para todos lo metodos y propiedades privadas
    @Get('/listar') // EndPoint
    getInicio(@Response() res) {
        const arregloTragos = this.tragosService.bddTragos;
        return res.render('tragos/lista-tragos.ejs', {arregloTragos1: arregloTragos});
    }

    @Get('/crear') // EndPoint
    getCrear(@Response() res) {
        return res.render('tragos/crear-editar.ejs');
    }
    @Post('/crear')
    postCrear(@Body() trago: Trago, @Response() res
              /* @Body('nombre') nombre: string,
               @Body('tipo') tipo: string,
               @Body('grados') grados: number,
               @Body('fechacad') fechacad: Date,
               @Body('precio') tipo: number*/
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        console.log('FechaCaducidad: ', trago.fechaCaducidad, typeof trago.fechaCaducidad);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);
        this.tragosService.crear(trago);
        res.redirect('listar');
    }
    @Post('/eliminar')
    postEliminar(@Body('id') id: number, @Response() res
    ) {
        const tragois = Number(id);
        this.tragosService.eliminarPorId(tragois);
        res.redirect('listar');
    }
}