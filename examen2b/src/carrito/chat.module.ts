import {Module} from '@nestjs/common';
import {CarritoGateway} from './chat.gateway';

@Module({
    providers: [CarritoGateway]
})
export class CarritoModule {}