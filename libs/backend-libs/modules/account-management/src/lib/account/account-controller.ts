import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { AccountExternalService } from './account-external.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
/**
 * controller bude mít stejné metody jako external-service, ale bude používat dto classes
 */

import {
	QueryManyAccountDto,
	QueryOneAccountDto,
} from './dto/query-account.dto';

@Controller('/account')
export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	@Get(':code')
	async findOne(@Param() code: string, @Query() query?: QueryOneAccountDto) {
		return this.accountExternalService.findOne({ code }, query);
	}
	@Get()
	async findAll(@Query() query?: QueryManyAccountDto) {
		return this.accountExternalService.findAll(query);
	}
	@Get('count')
	async count() {
		return this.accountExternalService.count();
	}
	@Delete(':code')
	async delete(@Param() code: string) {
		return this.accountExternalService.delete({ code });
	}

	@Post()
	async createOne(@Body() payload: CreateAccountDto) {
		return this.accountExternalService.createOne(payload);
	}

	//TODO: WHAT IS PURPOSE OF THIS?
	// @Post()
	// async upsertOne(@Body() payload: CreateAccountDto) {
	// 	return this.accountExternalService.upsertOne(payload);
	// }

	@Patch(':code')
	async updateOne(@Param() code: string, @Body() payload: UpdateAccountDto) {
		return this.accountExternalService.updateOne(payload, { code });
	}

	@Get('restore/:code')
	async restore(@Param() code: string) {
		return this.accountExternalService.restore({ code });
	}
}
