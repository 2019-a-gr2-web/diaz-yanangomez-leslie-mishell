export interface Trago {
    id: number;
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas'; // TypeScript valida que sean solo esos valores
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;
}