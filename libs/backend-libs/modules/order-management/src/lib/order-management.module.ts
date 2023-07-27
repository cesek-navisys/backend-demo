import { Module } from '@nestjs/common';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { orderProviders } from './order/entity-layer/order.provider';
import { OrderController } from './order/order-controller';
import { OrderExternalService } from './order/order-external.service';
import { OrderReadService } from './order/entity-layer/order-read.service';
import { OrderWriteService } from './order/entity-layer/order-write.service';
import { OrderWasteService } from './order/entity-layer/order-waste.service';
import { OrderBasketService } from './order/domain-layer/order-basket.service';
import { OrderConfirmedService } from './order/domain-layer/order-confirmed.service';

@Module({
	imports: [DatabaseModule],
	controllers: [OrderController],
	providers: [
		OrderExternalService,
		OrderReadService,
		OrderWriteService,
		OrderWasteService,
		OrderBasketService,
		OrderConfirmedService,
		...orderProviders,
	],
	exports: [],
})
export class OrderManagementModule {}
