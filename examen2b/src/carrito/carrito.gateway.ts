import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Client} from 'socket.io';
@WebSocketGateway(3001, { namespace: '/websockets' })
export class CarritoGateway {
    @WebSocketServer() server;
    constructor() {
        console.log(this.server);
    }
    @SubscribeMessage('despachar')
    despachar(cliente: Client | any, data: any) {
        cliente.broadcast.emit('despachado', data);
        return data.nombre;
    }

}