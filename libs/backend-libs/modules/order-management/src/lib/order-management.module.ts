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
import { OrderDetailsReadService } from './order-details/entity-layer/order-details-read.service';
import { OrderDetailsWasteService } from './order-details/entity-layer/order-details-waste.service';
import { OrderDetailsWriteService } from './order-details/entity-layer/order-details-write.service';
import { OrderDetailsExternalService } from './order-details/order-details-external.service';
import { OrderDetailsController } from './order-details/order-details-controller';
import { orderDetailsProviders } from './order-details/entity-layer/order-details.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [OrderController, OrderDetailsController],
	providers: [
		...orderDetailsProviders,
		...orderProviders,
		OrderBasketService,
		OrderConfirmedService,
		OrderDetailsExternalService,
		OrderDetailsReadService,
		OrderDetailsWasteService,
		OrderDetailsWriteService,
		OrderExternalService,
		OrderReadService,
		OrderWasteService,
		OrderWriteService,
	],
	exports: [],
})
export class OrderManagementModule {}
