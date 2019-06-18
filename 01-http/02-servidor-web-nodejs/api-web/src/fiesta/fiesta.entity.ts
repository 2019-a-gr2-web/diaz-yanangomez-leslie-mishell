import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TragosEntity} from '../trago/tragos.entity';
@Entity('bd_fiesta')
export class FiestaEntity {
@PrimaryGeneratedColumn()
    id: number;
    @ManyToOne( type => TragosEntity, trago => trago.fiestas)
    tragoId: TragosEntity;
}
