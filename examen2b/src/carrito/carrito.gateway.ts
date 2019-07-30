import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Client} from 'socket.io';

@WebSocketGateway(3001, { namespace: '/carrito' })
export class CarritoGateway {
@WebSocketServer() server;
@SubscribeMessage('carrito')
smCarrito(cliente: Client | any, data: any) {
    cliente.broadcast.emit('saludaron', data);
    return 'Hola ' + data;
}
constructor() {
        console.log(this.server);
    }
}