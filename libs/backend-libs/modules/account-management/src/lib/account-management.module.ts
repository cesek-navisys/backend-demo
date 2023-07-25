import { Module } from '@nestjs/common';
import { AccountController } from './account/account-controller';
import { AccountExternalService } from './account/account-external.service';

@Module({
	controllers: [AccountController],
	providers: [AccountExternalService],
	exports: [],
})
export class AccountManagementModule {}
