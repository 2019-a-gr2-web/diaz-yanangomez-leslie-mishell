import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AutoEntity} from './auto.entity';
@Entity('bd_conductor')
export class ConductorEntity {
    @PrimaryGeneratedColumn()
    conductorId: number;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'nombres',
    })
    nombres: string;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'apellidos',
    })
    apellidos: string;
    @Column({
        name: 'fechaNacimiento',
        type: 'datetime',
    })
    fechaNacimiento: Date;
    @Column({
        type: 'int',
        name: 'numeroAutos',
    })
    numeroAutos: number;
    @Column({
        name: 'licenciaValida',
    })
    licenciaValida: boolean;
    @OneToMany( type => AutoEntity, auto => auto.autoId)
    autos: AutoEntity[];
}
