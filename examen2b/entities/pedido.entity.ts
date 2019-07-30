import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';
import {DetalleEntity} from './detalle.entity';
@Entity('bd_pedido')
export class PedidoEntity {
    @PrimaryGeneratedColumn()
    pedidoId: number;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'estadoPedido',
    })
    estadoPedido: 'Activo'|'Por Despachar'|'Despachado';
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'totalSinImpuestos',
        default: 0.00,
    })
    totalSinImpuestos: number;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'totalConImpuestos',
        default: 0.00,
    })
    totalConImpuestos: number;
    @ManyToOne(type => UsuarioEntity,
        usuario => usuario.pedidos)
        usuarioId: UsuarioEntity;
    @OneToMany( type => DetalleEntity, detalle => detalle.numLinea)
    detalle: DetalleEntity[];
}
