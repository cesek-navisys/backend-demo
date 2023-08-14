import { AccountManagementModule } from '@backend-demo/backend-libs/modules/account-management';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { OrderManagementModule } from '@backend-demo/backend-libs/modules/order-management';
import { ProductManagementModule } from '@backend-demo/backend-libs/modules/product-management';

@Module({
	imports: [
		AccountManagementModule,
		CqrsModule,
		DatabaseModule,
		EventEmitterModule.forRoot(),
		OrderManagementModule,
		ProductManagementModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
