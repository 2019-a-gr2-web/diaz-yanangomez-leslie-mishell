import {Module} from '@nestjs/common';
import {CarritoGateway} from './carrito.gateway';

@Module({
    providers: [CarritoGateway],
    exports: [CarritoGateway],
})
export class CarritoModule {}