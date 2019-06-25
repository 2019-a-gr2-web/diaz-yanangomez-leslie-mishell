import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class TragosUpdateDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    nombre: string;
    @IsOptional()
    @IsNumber() // es un numero
    precio: number;
}