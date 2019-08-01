import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Client} from 'socket.io';

@WebSocketGateway(3001, { namespace: '/websockets' })
export class ChatGateway {
@WebSocketServer() server;
@SubscribeMessage('holaMundo')
async smHolaMundo(cliente: Client | any, data: any) {
    //console.log(data);
    //console.log('Nos hacen la peticion');
    //console.log(this.server);
    cliente.broadcast.emit('saludaron', data); // Emitir respuestas a clientes
    return 'Hola ' + data.nombre;
}
constructor() {
        // console.log(this.server);
    }
}