import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { OrderBasketService } from './order/domain-layer/order-basket.service';
import { OrderConfirmedService } from './order/domain-layer/order-confirmed.service';
import { OrderController } from './order/order-controller';
import { OrderDetailsController } from './order-details/order-details-controller';
import { OrderDetailsExternalService } from './order-details/order-details-external.service';
<<<<<<< HEAD
import { orderDetailsProviders } from './order-details/entity-layer/order-details.provider';
=======
import { OrderDetailsManagementQueryService } from './order-details-management-query.service';
>>>>>>> 10c2ed3b90c286a0dfb745085f0780cef6a6ff08
import { OrderDetailsReadService } from './order-details/entity-layer/order-details-read.service';
import { OrderDetailsWasteService } from './order-details/entity-layer/order-details-waste.service';
import { OrderDetailsWriteService } from './order-details/entity-layer/order-details-write.service';
import { OrderExternalService } from './order/order-external.service';
import { OrderManagementQueryService } from './order-management-query.service';
<<<<<<< HEAD
import { orderProviders } from './order/entity-layer/order.provider';
import { OrderReadService } from './order/entity-layer/order-read.service';
import { OrderWasteService } from './order/entity-layer/order-waste.service';
import { OrderWriteService } from './order/entity-layer/order-write.service';
import { productProviders } from 'libs/backend-libs/modules/product-management/src/lib/product/entity-layer/product.provider';
import { ProductReadService } from 'libs/backend-libs/modules/product-management/src/lib/product/entity-layer/product-read.service';
=======
import { OrderReadService } from './order/entity-layer/order-read.service';
import { OrderWasteService } from './order/entity-layer/order-waste.service';
import { OrderWriteService } from './order/entity-layer/order-write.service';
import { orderProviders } from './order/entity-layer/order.provider';
import { CommandCreateOrderDetailsHandler } from './order-details/event-layer/order-details-command.handler';
import { orderDetailsProviders } from './order-details/entity-layer/order-details.provider';
>>>>>>> 10c2ed3b90c286a0dfb745085f0780cef6a6ff08

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
