import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { OrderBasketService } from './order/domain-layer/order-basket.service';
import { OrderConfirmedService } from './order/domain-layer/order-confirmed.service';
import { OrderController } from './order/order-controller';
import { OrderDetailsController } from './order-details/order-details-controller';
import { OrderDetailsExternalService } from './order-details/order-details-external.service';
import { OrderDetailsManagementQueryService } from './order-details-management-query.service';
import { OrderDetailsReadService } from './order-details/entity-layer/order-details-read.service';
import { OrderDetailsWasteService } from './order-details/entity-layer/order-details-waste.service';
import { OrderDetailsWriteService } from './order-details/entity-layer/order-details-write.service';
import { OrderExternalService } from './order/order-external.service';
import { OrderManagementQueryService } from './order-management-query.service';
import { OrderReadService } from './order/entity-layer/order-read.service';
import { OrderWasteService } from './order/entity-layer/order-waste.service';
import { OrderWriteService } from './order/entity-layer/order-write.service';
import { orderProviders } from './order/entity-layer/order.provider';
import { CommandCreateOrderDetailsHandler } from './order-details/event-layer/order-details-command.handler';
import { orderDetailsProviders } from './order-details/entity-layer/order-details.provider';

@Module({
	imports: [DatabaseModule, CqrsModule],
	controllers: [OrderController, OrderDetailsController],
	providers: [
		...orderDetailsProviders,
		...orderProviders,
		OrderBasketService,
		OrderConfirmedService,
		CommandCreateOrderDetailsHandler,
		OrderManagementQueryService,
		OrderDetailsExternalService,
		OrderDetailsManagementQueryService,
		OrderDetailsReadService,
		OrderDetailsWasteService,
		OrderDetailsWriteService,
		OrderExternalService,
		OrderManagementQueryService,
		OrderReadService,
		OrderWasteService,
		OrderWriteService,
	],
	exports: [],
})
export class OrderManagementModule {}
