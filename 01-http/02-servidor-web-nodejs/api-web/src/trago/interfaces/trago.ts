export interface Trago {
    id?: number; // ? indica que es un parametro opcional
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cerveza'; // TypeScript valida que sean solo esos valores
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;
}