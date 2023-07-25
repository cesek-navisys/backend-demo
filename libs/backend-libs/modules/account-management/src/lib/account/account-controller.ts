/**
 * controller bude mít stejné metody jako external-service, ale bude používat dto classes
 */

import { Injectable } from "@nestjs/common";
import { AccountExternalService } from "./account-external.service";
import { IAccountFindOneParams, IAccountFindOneQuery, IAccountFindFirstParams, IAccountFindFirstQuery, IAccountFindManyParams, IAccountFindManyQuery } from "./entity-layer/interfaces/account-read.interfaces";
import { IAccountDeleteOneParams, IAccountDeleteOneQuery, IAccountRestoreOneParams, IAccountRestoreOneQuery } from "./entity-layer/interfaces/account-waste.interfaces";
import { IAccountCreateOneParams, IAccountCreateOneQuery, IAccountCreateManyParams, IAccountCreateManyQuery, IAccountUpsertOneQuery, IAccountUpdateOneParams, IAccountUpdateOneQuery, IAccountUpdateManyParams, IAccountUpdateManyQuery } from "./entity-layer/interfaces/account-write.interfaces";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Injectable()
export class AccountController {
	constructor(
		private readonly accountExternalService: AccountExternalService
	) {}

	findOne(params: IAccountFindOneParams, query?: IAccountFindOneQuery) {
		return this.accountExternalService.findOne(params, query);
	}
	async findFirst(
		params: IAccountFindFirstParams,
		query?: IAccountFindFirstQuery
	) {
		return this.accountExternalService.findFirst(params, query);
	}
	async findAll(
		params: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountExternalService.findAll(params, query);
	}
	async findAndCountAll(
		params: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountExternalService.findAndCountAll(params, query);
	}
	async count(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountExternalService.count(params, query);
	}
	async delete(
		params: IAccountDeleteOneParams,
		query?: IAccountDeleteOneQuery
	) {
		return this.accountExternalService.delete(params, query);
	}
	async restore(
		params: IAccountRestoreOneParams,
		query?: IAccountRestoreOneQuery
	) {
		return this.accountExternalService.restore(params, query);
	}
	async createOne(
		payload: CreateAccountDto,
		params: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	) {
		return this.accountExternalService.createOne(payload, params, query);
	}
	async createMany(
		payload: CreateAccountDto[],
		params: IAccountCreateManyParams,
		query: IAccountCreateManyQuery
	) {
		return this.accountExternalService.createMany(payload, params, query);
	}
	async upsertOne(
		payload: CreateAccountDto,
		params: IAccountUpsertOneQuery,
		query?: IAccountUpsertOneQuery
	) {
		return this.accountExternalService.upsertOne(payload, params, query);
	}
	async updateOne(
		payload: UpdateAccountDto,
		params: IAccountUpdateOneParams,
		query?: IAccountUpdateOneQuery
	) {
		return this.accountExternalService.updateOne(payload, params, query);
	}
	async updateMany(
		payload: UpdateAccountDto[],
		params: IAccountUpdateManyParams,
		query: IAccountUpdateManyQuery
	) {
		return this.accountExternalService.updateMany(payload, params, query);
	}
}