import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { ProductController } from './product/product-controller';
import { ProductExternalService } from './product/product-external.service';
import { productProviders } from './product/entity-layer/product.provider';
import { ProductReadService } from './product/entity-layer/product-read.service';
import { ProductWasteService } from './product/entity-layer/product-waste.service';
import { ProductWriteService } from './product/entity-layer/product-write.service';

@Module({
	imports: [DatabaseModule],
	controllers: [ProductController],
	providers: [
		...productProviders,
		ProductExternalService,
		ProductReadService,
		ProductWasteService,
		ProductWriteService,
	],
})
export class ProductManagementModule {}
