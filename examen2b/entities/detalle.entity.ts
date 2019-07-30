import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PedidoEntity} from './pedido.entity';
import {AutoEntity} from './auto.entity';
@Entity('bd_detalle')
export class DetalleEntity {
    @PrimaryGeneratedColumn()
    numLinea: number;
    @Column({
        type: 'int',
        name: 'cantidad',
    })
    cantidad: number;
    @ManyToOne(type => PedidoEntity,
        pedido => pedido.detalle)
    pedidoId: PedidoEntity;
    @ManyToOne(type => AutoEntity,
        auto => auto.detalles)
    autoId: AutoEntity;
}
