import { Module } from '@nestjs/common';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { orderProviders } from './order/entity-layer/order.provider';
import { OrderController } from './order/order-controller';
import { OrderExternalService } from './order/order-external.service';

@Module({
	imports: [DatabaseModule],
	controllers: [OrderController],
	providers: [OrderExternalService, ...orderProviders],
	exports: [],
})
export class OrderManagementModule {}
