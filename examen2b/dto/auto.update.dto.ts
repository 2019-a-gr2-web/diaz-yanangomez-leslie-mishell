import {IsNotEmpty, IsString} from 'class-validator';
export class AutoUpdateDto {
    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    colorUno: string;
    @IsNotEmpty() // No esta vacio y es un string
    @IsString()
    colorDos: string;
}
