import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {AutoEntity} from '../entities/auto.entity';
import {Auto} from '../interfaces/auto';
import {PedidoEntity} from "./pedido.entity";
import {DetalleEntity} from "./detalle.entity";

@Injectable()
export class AutoService {
    constructor(@InjectRepository(AutoEntity) private readonly _autoRepository: Repository<AutoEntity>) {
        /*const auto: Auto = {
            chasis: 30,
            nombreMarca: 'Hyundai',
            colorUno: 'gris',
            colorDos: 'plateado',
            nombreModelo: 'EX599',
            anio: 2016,
            precio: 2000.00,
            conductorId: 1,
        };
        this.crearAuto(auto); */

    }
    crearAuto(nuevoAuto: Auto): Promise<AutoEntity> {
        // @ts-ignore
        const objetoEntidad = this._autoRepository.create(nuevoAuto);
        return this._autoRepository.save(objetoEntidad);
    }
    eliminarAutoPorId(autoid): Promise<DeleteResult> {
        return this._autoRepository.delete({autoId: autoid});
    }
    getAutos(conductorid): Promise<AutoEntity[]> {
        /*return this._autoRepository.find({
            where: [
                { conductorId: conductorid},
            ],
        });*/
        return this._autoRepository.find({conductorId: conductorid});
    }
    buscarPorChasis(parametro: number): Promise<AutoEntity[]> {
        return this._autoRepository.find({chasis: parametro});
    }
    buscarPorId(autoid: number): Promise<AutoEntity> {
        return this._autoRepository.findOne({autoId: autoid});
    }
    buscarPorColor(parametro: string): Promise<AutoEntity[]> {
        return this._autoRepository.find({
            where: [
                { colorUno: parametro},
                { colorDos: parametro},
            ],
        });
    }
    getAutosEnPedido(idpedido): Promise<any[]>  {
        return this._autoRepository.createQueryBuilder('auto')
            .innerJoinAndSelect(DetalleEntity, 'detalle', 'auto.autoId = detalle.autoIdAutoId')
            .innerJoinAndSelect(PedidoEntity, 'pedido', 'detalle.pedidoIdPedidoId = pedido.pedidoId')
            .where('detalle.pedidoIdPedidoId = :pedidoid AND pedido.estadoPedido = :estado', { pedidoid: idpedido, estado: 'Activo'})
            .getMany();
    }

    actualizarAuto(auto: Auto): Promise<UpdateResult> {
        return this._autoRepository.update(auto.autoId, {colorUno: auto.colorUno, colorDos: auto.colorDos, precio: auto.precio});
    }
}
