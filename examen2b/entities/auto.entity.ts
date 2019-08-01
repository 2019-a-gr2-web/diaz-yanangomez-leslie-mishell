import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {ConductorEntity} from './conductor.entity';
import {DetalleEntity} from "./detalle.entity";
@Entity('bd_auto')
export class AutoEntity {
    @PrimaryGeneratedColumn()
    autoId: number;
    @Column({
        name: 'chasis',
        type: 'int',
    })
    chasis: number;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'nombreMarca',
    })
    nombreMarca: string;
    @Column({
        type: 'varchar',
        length: 20,
        name: 'colorUno',
    })
    colorUno: string;
    @Column({
        type: 'varchar',
        length: 20,
        name: 'colorDos',
    })
    colorDos: string;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'nombreModelo',
    })
    nombreModelo: string;
    @Column({
        type: 'int',
        name: 'anio',
    })
    anio: number;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio',
        default: 0.00,
    })
    precio: number;
    @ManyToOne(type => ConductorEntity,
        conductor => conductor.autos, { onDelete: 'CASCADE'})
    conductorId: ConductorEntity;
    @OneToMany( type => DetalleEntity, detalle => detalle.numLinea)
    detalles: DetalleEntity[];
}
