import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {TragosEntity} from '../trago/tragos.entity';

// Respeto a trago es el papa, la relacion es de un distribuidor tiene muchos tragos (one to many)
@Entity('bd_distibuidor')
export class DistribuidorEntity {
@PrimaryGeneratedColumn()
    id: number;
@Column()
    nombre: string;
@OneToMany( type => TragosEntity, trago => trago.distribuidorId)
    tragos: TragosEntity[];
}