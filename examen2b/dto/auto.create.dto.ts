import {IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
export class AutoCreateDto {
    @IsEmpty()
    autoId: number;
    @IsNotEmpty() // No esta vacio y es un string
    @IsNumber()
    chasis: number;

    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    nombreMarca: string;

    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    colorUno: string;

    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    colorDos: string;
    @IsNotEmpty() // No esta vacio y es un numero
    @IsString()
    nombreModelo: string;
    @IsNotEmpty()
    @IsNumber()
    anio: number;
    @IsNotEmpty() // es un numero
    @IsNumber()
    precio: number;
    @IsNotEmpty() // es un numero
    @IsNumber()
    conductorId: number;
    @IsOptional()
    estaCarrito: boolean;
}
