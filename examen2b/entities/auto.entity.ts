import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {ConductorEntity} from './conductor.entity';
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
    @ManyToOne(type => ConductorEntity,
        conductor => conductor.autos)
    conductorId: ConductorEntity;
}
