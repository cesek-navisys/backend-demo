import { AccountController } from './account/account-controller';
import { AccountExternalService } from './account/account-external.service';
import { AccountManagementQueryService } from './account-management-query.service';
import { accountProvider } from './account/entity-layer/account.provider';
import { AccountReadService } from './account/entity-layer/account-read.service';
import { AccountWasteService } from './account/entity-layer/account-waste.service';
import { AccountWriteService } from './account/entity-layer/account-write.service';
import { CommandActivateAccountByCodeHandler } from './account/event-layer/account-command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@backend-demo/backend-libs/modules/database-module';
import { Module } from '@nestjs/common';
import { QueryFindAccountByCodeHandler } from './account/event-layer/account-query.handler';

const events = [QueryFindAccountByCodeHandler, CommandActivateAccountByCodeHandler];

@Module({
	imports: [DatabaseModule, CqrsModule],
	controllers: [AccountController],
	providers: [
		...accountProvider,
		...events,
		AccountExternalService,
		AccountManagementQueryService,
		AccountReadService,
		AccountWasteService,
		AccountWriteService,
	],
	exports: [],
})
export class AccountManagementModule {}
