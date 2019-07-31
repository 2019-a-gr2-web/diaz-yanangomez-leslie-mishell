import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DetalleEntity} from './detalle.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Detalle} from '../interfaces/detalle';
import {AutoEntity} from "./auto.entity";

@Injectable()
export class DetalleService {
    constructor(@InjectRepository(DetalleEntity) private readonly _detalleRepository: Repository<DetalleEntity>) {
    }
    nuevoDetalle(detalle: Detalle): Promise<DetalleEntity> {
        // @ts-ignore
        const objetoEntidad = this._detalleRepository.create(detalle);
        return this._detalleRepository.save(objetoEntidad);
    }
    masProducto(detalle: DetalleEntity): Promise<UpdateResult> {
        return this._detalleRepository.update(detalle.numLinea, {cantidad: detalle.cantidad});
    }
    eliminarDelCarrito(autoid, pedidoid): Promise<DeleteResult> {
        return this._detalleRepository.delete({autoId: autoid, pedidoId: pedidoid});
    }
    getDetallesPorPedido(pedidoid): Promise<DetalleEntity[]> {
        // return this._detalleRepository.createQueryBuilder('detalle')
       //     .leftJoinAndSelect(AutoEntity, 'auto', 'auto.autoId = detalle.autoIdAutoId')
        //    .where('pedidoIdPedidoId = :pedidosid',{pedidosid: pedidoid}).getMany();
        return this._detalleRepository.find({where: [{pedidoId: pedidoid}]});
    }
    buscarProductoEnDetalle(pedidoid, autoid): Promise<DetalleEntity> {
        return this._detalleRepository.findOne({pedidoId: pedidoid, autoId: autoid});
    }
}
