import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PedidoEntity} from './pedido.entity';
@Entity('bd_usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    usuarioId: number;
    @Column({
        type: 'char',
        length: 10,
        name: 'cedula',
    })
    cedula: string;
    @Column({
        type: 'varchar',
        length: 50,
        name: 'nomape',
    })
    nombreApellido: string;
    @Column({
        type: 'varchar',
        length: 100,
        name: 'direccion',
    })
    direccion: string;
    @Column({
        type: 'char',
        length: 10,
        name: 'celular',
    })
    celular: string;
    @Column({
        type: 'varchar',
        length: 20,
        name: 'username',
    })
    username: string;
    @Column({
        type: 'varchar',
        length: 15,
        name: 'password',
    })
    password: string;
    @Column({
        type: 'char',
        length: 1,
        name: 'rol', // 0 admin, 1 usuario, 2 despachador
    })
    rolId: number;
    @OneToMany( type => PedidoEntity, pedido => pedido.pedidoId)
    pedidos: PedidoEntity[];
}