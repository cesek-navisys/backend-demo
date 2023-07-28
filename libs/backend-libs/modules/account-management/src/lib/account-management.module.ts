import { AccountController } from './account/account-controller';
import { AccountExternalService } from './account/account-external.service';
import { AccountReadService } from './account/entity-layer/account-read.service';
import { accountProvider } from './account/entity-layer/account.provider';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { AccountWriteService } from './account/entity-layer/account-write.service';
import { AccountWasteService } from './account/entity-layer/account-waste.service';

@Module({
	imports: [DatabaseModule],
	controllers: [AccountController],
	providers: [
		AccountReadService,
		AccountWriteService,
		AccountWasteService,
		AccountExternalService,
		...accountProvider,
	],
	exports: [],
})
export class AccountManagementModule {}
