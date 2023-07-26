import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { ProductManagementModule } from '@backend-demo/backend-libs/modules/product-management';

@Module({
	imports: [DatabaseModule, ProductManagementModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
