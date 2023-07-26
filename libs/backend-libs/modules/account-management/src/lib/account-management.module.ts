import { Module } from '@nestjs/common';
import { AccountController } from './account/account-controller';
import { AccountExternalService } from './account/account-external.service';
import { accountProvider } from './account/entity-layer/account.provider';

@Module({
	controllers: [AccountController],
	providers: [AccountExternalService, ...accountProvider],
	exports: [],
})
export class AccountManagementModule {}
