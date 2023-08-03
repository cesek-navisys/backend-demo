import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { OrderManagementModule } from '@backend-demo/backend-libs/modules/order-management';
import { AccountManagementModule } from '@backend-demo/backend-libs/modules/account-management';
import { ProductManagementModule } from '@backend-demo/backend-libs/modules/product-management';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
	imports: [
		DatabaseModule,
		OrderManagementModule,
		AccountManagementModule,
		ProductManagementModule,
		EventEmitterModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
