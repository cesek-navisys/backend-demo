import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { AccountExternalService } from './account-external.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import {
	ACCOUNTS_ALIAS,
	ACCOUNT_CODE_API_PARAM
} from '@backend-demo/shared/constants';
import {
	ApiAcceptedResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger';
import { accountManagementRoutes } from '../account-management.routes';

@ApiTags(ACCOUNTS_ALIAS)
@Controller(accountManagementRoutes.account)
export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	@Get(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiOkResponse()
	async findOne(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		return this.accountExternalService.findOne({ code: accountCode });
	}
	@Get()
	@ApiOkResponse()
	async findAll() {
		return this.accountExternalService.findAndCountAll();
	}

	@Delete(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiNoContentResponse()
	async delete(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		return this.accountExternalService.delete({ code: accountCode });
	}

	@Post()
	@ApiCreatedResponse()
	async create(@Body() createAccountDto: CreateAccountDto) {
		return this.accountExternalService.create(createAccountDto);
	}

	@Patch(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiAcceptedResponse()
	async update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Body() updateAccountDto: UpdateAccountDto
	) {
		return this.accountExternalService.update(
			{ code: accountCode },
			updateAccountDto
		);
	}
}
