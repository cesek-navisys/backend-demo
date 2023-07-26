import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { ProductController } from './product/product-controller';
import { ProductExternalService } from './product/product-external.service';
import { productProviders } from './product/entity-layer/product.provider';

@Module({
	imports: [DatabaseModule],
	controllers: [ProductController],
	providers: [ProductExternalService, ...productProviders],
})
export class ProductManagementModule {}
