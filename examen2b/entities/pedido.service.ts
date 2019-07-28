import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {PedidoEntity} from '../entities/pedido.entity';
import {Pedido} from '../interfaces/pedido';

@Injectable()
export class PedidoService {
    constructor(@InjectRepository(PedidoEntity) private readonly _pedidoRepository: Repository<PedidoEntity>) {
        const pedido: Pedido = {
            estadoPedido: 'Despachado',
            totalSinImpuestos: 12.00,
            totalConImpuestos: 12.15,
            usuarioId: 1,
        };
        this.crearPedido(pedido);
    }
    crearPedido(nuevoPedido: Pedido): Promise<PedidoEntity> {
        // @ts-ignore
        const objetoEntidad = this._pedidoRepository.create(nuevoPedido);
        return this._pedidoRepository.save(objetoEntidad);
    }
}
