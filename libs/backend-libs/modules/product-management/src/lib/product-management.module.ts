import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { ProductController } from './product/product-controller';
import { ProductEventHandler } from './product/event-layer/product-event.handler';
import { ProductExternalService } from './product/product-external.service';
import { ProductReadService } from './product/entity-layer/product-read.service';
import { ProductWasteService } from './product/entity-layer/product-waste.service';
import { ProductWriteService } from './product/entity-layer/product-write.service';
import { productProvider } from './product/entity-layer/product.provider';
import {
	QueryFindAccountCodeByProductCodeHandler,
	QueryFindFirstProductHandler,
	QueryFindProductByCodeHandler,
} from './product/event-layer/product-query.handler';
import { ProductBasketService } from './product/domain-layer/product-basket.service';
import { CqrsModule } from '@nestjs/cqrs';

const events = [
	ProductEventHandler,
	QueryFindProductByCodeHandler,
	QueryFindFirstProductHandler,
	QueryFindAccountCodeByProductCodeHandler,
];

@Module({
	imports: [DatabaseModule, CqrsModule],
	controllers: [ProductController],
	providers: [
		...events,
		...productProvider,
		ProductBasketService,
		ProductExternalService,
		ProductReadService,
		ProductWasteService,
		ProductWriteService,
	],
})
export class ProductManagementModule {}
