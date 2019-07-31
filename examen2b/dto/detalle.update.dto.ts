import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class DetalleUpdateDto {
    @IsNotEmpty() // No esta vacio y es un string
    @IsNumber()
    cantidad: number;
}
