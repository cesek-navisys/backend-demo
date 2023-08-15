import { AccountExternalService } from './account-external.service';
import { accountManagementRoutes } from '../account-management.routes';
import { CreateAccountDto } from './dto/create-account.dto';
import { plainToClass } from 'class-transformer';
import { QueryManyAccountDto } from './dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ViewAccountDto } from './dto/view-account.dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';

import {
	ACCOUNTS_ALIAS,
	ACCOUNT_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
import {
	ApiAcceptedResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags(ACCOUNTS_ALIAS)
@Controller(accountManagementRoutes.account)
export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	@Get(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiOperation({ summary: 'Find single account' })
	@ApiOkResponse()
	async findOne(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		const entity = this.accountExternalService.findOne({
			code: accountCode,
		});
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}

	@Get()
	@ApiOperation({ summary: 'Find accounts' })
	@ApiOkResponse({ type: [ViewAccountDto] })
	async findAll(@Query() query?: QueryManyAccountDto) {
		const { rows: accounts, count } =
			await this.accountExternalService.findAndCountAll(query);

		const transformedRows = accounts.map((account) =>
			plainToClass(ViewAccountDto, account, {
				excludeExtraneousValues: true,
			})
		);

		return transformedRows;
	}

	@Delete(`:${ACCOUNT_CODE_API_PARAM}`)
	@HttpCode(204)
	@ApiOperation({ summary: 'Delete account' })
	@ApiAcceptedResponse()
	async delete(@Param(ACCOUNT_CODE_API_PARAM) accountCode: string) {
		await this.accountExternalService.delete({ code: accountCode });
		return {};
	}

	@Post()
	@ApiOperation({ summary: 'Create account' })
	@ApiCreatedResponse()
	async create(@Body() createAccountDto: CreateAccountDto) {
		const entity = await this.accountExternalService.create(
			createAccountDto
		);
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}

	@Patch(`:${ACCOUNT_CODE_API_PARAM}`)
	@ApiOperation({ summary: 'Update account' })
	@ApiOkResponse()
	async update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Body() updateAccountDto: UpdateAccountDto
	) {
		const entity = await this.accountExternalService.update(
			{ code: accountCode },
			updateAccountDto
		);
		return plainToClass(ViewAccountDto, entity, {
			excludeExtraneousValues: true,
		});
	}
}
