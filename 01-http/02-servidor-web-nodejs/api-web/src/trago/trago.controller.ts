import {Controller, Get, Response} from '@nestjs/common';
import {TragoService} from './trago.service';

@Controller('/api/traguito')
export class TragoController {
    // Injeccion de Dependencias
    constructor(private readonly tragosService: TragoService ) {} // Guion bajo para todos lo metodos y propiedades privadas
    @Get('/listar') // EndPoint
    getInicio(@Response() res) {
        const arregloTragos = this.tragosService.bddTragos;
        return res.render('tragos/lista-tragos.ejs', { arregloTragos1: arregloTragos });
    }
    }
