import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class TragosCreateDto {
    @IsEmpty()
    id: number;

    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    nombre: string;

    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    tipo: string;

    @IsNotEmpty() // No esta vacio y es un numero
    @IsNumber()
    gradosAlcohol: number;
    @IsOptional()
    @IsDate() // Es una fecha, aparte es opcional
    fechaCaducidad: Date;

    @IsOptional()
    @IsNumber() // es un numero
    precio: number;

    @IsNumber() // es un numero
    @IsOptional()
    distribuidorId: number;
}