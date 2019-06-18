import {Body, Controller, Get, Post, Response} from '@nestjs/common';
import {TragoService} from './trago.service';
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')
export class TragoController {
    // Injeccion de Dependencias
    constructor(private readonly tragosService: TragoService) {
    } // Guion bajo para todos lo metodos y propiedades privadas
    @Get('/listar') // EndPoint
    async getListar(@Response() res) {
        const arregloTragos = await this.tragosService.buscar();
        return res.render('tragos/lista-tragos.ejs', {arregloTragos1: arregloTragos});
    }

    @Get('/crear') // EndPoint
    getCrear(@Response() res) {
        return res.render('tragos/crear-editar.ejs');
    }
    @Post('/crear')
    async postCrear(@Body() trago: Trago, @Response() res
    // Para que el codigo vuelva a ser asincrono hay que poner la palabra async antes de; metodo
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
        // Await para cualquier promesa, CUANDO SE USA AWAIT SE DEBE usar el try catch
        try {
            const respCrear = await this.tragosService.crear(trago);
            console.log('RESPUESTA: ', respCrear);
            res.redirect('listar');
         } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }
    }
    @Post('/eliminar')
    postEliminar(@Body('id') id: number, @Response() res
    ) {
        const tragois = Number(id);
        this.tragosService.eliminarPorId(tragois);
        res.redirect('listar');
    }
}