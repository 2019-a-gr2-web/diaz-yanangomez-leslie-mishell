import {Module} from '@nestjs/common';
import {CarritoGateway} from "../../../../../examen2b/src/carrito/carrito.gateway";

@Module({
    providers: [CarritoGateway]
})
export class ChatModule {}