import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { OrderManagementModule } from '@backend-demo/backend-libs/modules/order-management';
import { AccountManagementModule } from '@backend-demo/backend-libs/modules/account-management';
import { ProductManagementModule } from '@backend-demo/backend-libs/modules/product-management';

@Module({
	imports: [
		DatabaseModule,
		OrderManagementModule,
		AccountManagementModule,
		// OrderManagementModule,
		ProductManagementModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
