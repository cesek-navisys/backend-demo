import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';

@Module({
	imports: [
		DatabaseModule,
		// AccountManagementModule,
		// OrderManagementModule,
		// ProductManagementModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
