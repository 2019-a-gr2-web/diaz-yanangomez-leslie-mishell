import {Body, Controller, Get, Post, Response, Query, Param, Res} from '@nestjs/common';
import {TragoService} from './trago.service';
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";
import {TragosUpdateDto} from "./dto/tragos.update.dto";

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
    @Get('/actualizar/:id') // EndPoint
    async getActualizar(@Response() res, @Param() param) {
        const arregloTragos = await this.tragosService.buscarPorId(param.id);
        return res.render('tragos/editar.ejs', {arregloTragos1: arregloTragos});
    }
    @Post('/actualizar')
    async postActualizar(@Body() trago: Trago, @Response() res
                    // Para que el codigo vuelva a ser asincrono hay que poner la palabra async antes de; metodo
                    /* @Body('nombre') nombre: string,
                     @Body('tipo') tipo: string,
                     @Body('grados') grados: number,
                     @Body('fechacad') fechacad: Date,
                     @Body('precio') tipo: number*/
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        // trago.fechaCaducidad = new Date ('2019-11-06'); sdfdsfsfsd
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined; // operador ternario
        console.log(trago);
        // Validacion
        let tragoValidar = new TragosUpdateDto();
        tragoValidar.nombre = trago.nombre;
        tragoValidar.id = trago.id;
        tragoValidar.precio = trago.precio;
        // Await para cualquier promesa, CUANDO SE USA AWAIT SE DEBE usar el try catch
        try {
            const respValidacionErrors = await validate(tragoValidar);
            if (respValidacionErrors.length > 0) {
                console.error(respValidacionErrors); // jjk
                res.redirect('../actualizar/' + trago.id + '?mensaje=Hubo un error en el formulario'); // hhjgj
            } else {
                await this.tragosService.actualizar(trago);
                res.redirect('listar');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }
    }
    @Get('/crear') // EndPoint
    getCrear(@Response() res, @Query('mensaje') mensaje1: string) {
        return res.render('tragos/crear-editar.ejs', {mensaje: mensaje1});
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
        // trago.fechaCaducidad = new Date ('2019-11-06'); sdfdsfsfsd
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined; // operador ternario
        console.log(trago);
        // Validacion
        let tragoValidar = new TragosCreateDto();
        tragoValidar.nombre = trago.nombre;
        tragoValidar.tipo = trago.tipo;
        tragoValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoValidar.precio = trago.precio;
        tragoValidar.gradosAlcohol = trago.gradosAlcohol;
        // Await para cualquier promesa, CUANDO SE USA AWAIT SE DEBE usar el try catch
        try {
            const respValidacionErrors = await validate(tragoValidar);
            if (respValidacionErrors.length > 0) {
                console.error(respValidacionErrors); // jjk
                res.redirect('crear?mensaje=Hubo un error en el formulario'); // hhjgj
            } else {
                const respCrear = await this.tragosService.crear(trago);
                console.log('RESPUESTA: ', respCrear);
                res.redirect('listar');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }
    }

    @Post('/eliminar')
    async postEliminar(@Body('id') id: number, @Response() res
    ) {
        const tragois = Number(id);
        try {
            const result = await this.tragosService.eliminarPorId(tragois);
            // console.log(result);
            res.redirect('listar');
        } catch (error) {
            console.error(error);
            res.status(500).send({mensaje: 'Hubo un error', codigo: 500});
        }
    }
}