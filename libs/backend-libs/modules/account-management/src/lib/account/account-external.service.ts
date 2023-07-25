import { Injectable } from '@nestjs/common';
import { AccountReadService } from './entity-layer/account-read.service';
import { AccountWasteService } from './entity-layer/account-waste.service';
import { AccountWriteService } from './entity-layer/account-write.service';
import {
	IAccountFindFirstParams,
	IAccountFindFirstQuery,
	IAccountFindManyParams,
	IAccountFindManyQuery,
	IAccountFindOneParams,
	IAccountFindOneQuery,
} from './entity-layer/interfaces/account-read.interfaces';
import {
	IAccountDeleteOneParams,
	IAccountDeleteOneQuery,
	IAccountRestoreOneParams,
	IAccountRestoreOneQuery,
} from './entity-layer/interfaces/account-waste.interfaces';
import {
	IAccountCreateManyParams,
	IAccountCreateManyQuery,
	IAccountCreateOneParams,
	IAccountCreateOneQuery,
	IAccountUpdateManyParams,
	IAccountUpdateManyQuery,
	IAccountUpdateOneParams,
	IAccountUpdateOneQuery,
	IAccountUpsertOneQuery,
} from './entity-layer/interfaces/account-write.interfaces';
import { IAccountCreate } from './dto/interfaces/create-account.interface';
import { IAccountUpdate } from './dto/interfaces/update-account.interface';

@Injectable()
export class AccountExternalService {
	constructor(
		private readonly accountReadService: AccountReadService,
		private readonly accountWriteService: AccountWriteService,
		private readonly accountWasteService: AccountWasteService
	) {}

	findOne(params: IAccountFindOneParams, query?: IAccountFindOneQuery) {
		return this.accountReadService.findOne(params, query);
	}
	async findFirst(
		params: IAccountFindFirstParams,
		query?: IAccountFindFirstQuery
	) {
		return this.accountReadService.findFirst(params, query);
	}
	async findAll(
		params: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountReadService.findAll(params, query);
	}
	async findAndCountAll(
		params: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountReadService.findAndCountAll(params, query);
	}
	async count(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountReadService.count(params, query);
	}
	async delete(
		params: IAccountDeleteOneParams,
		query?: IAccountDeleteOneQuery
	) {
		return this.accountWasteService.delete(params, query);
	}
	async restore(
		params: IAccountRestoreOneParams,
		query?: IAccountRestoreOneQuery
	) {
		return this.accountWasteService.restore(params, query);
	}
	async createOne(
		payload: IAccountCreate,
		params: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	) {
		return this.accountWriteService.createOne(payload, params, query);
	}
	async createMany(
		payload: IAccountCreate[],
		params: IAccountCreateManyParams,
		query: IAccountCreateManyQuery
	) {
		return this.accountWriteService.createMany(payload, params, query);
	}
	async upsertOne(
		payload: IAccountCreate,
		params: IAccountUpsertOneQuery,
		query?: IAccountUpsertOneQuery
	) {
		return this.accountWriteService.upsertOne(payload, params, query);
	}
	async updateOne(
		payload: IAccountUpdate,
		params: IAccountUpdateOneParams,
		query?: IAccountUpdateOneQuery
	) {
		return this.accountWriteService.updateOne(payload, params, query);
	}
	async updateMany(
		payload: IAccountUpdate[],
		params: IAccountUpdateManyParams,
		query: IAccountUpdateManyQuery
	) {
		return this.accountWriteService.updateMany(payload, params, query);
	}
}
