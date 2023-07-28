import { AccountReadService } from './entity-layer/account-read.service';
import { AccountWasteService } from './entity-layer/account-waste.service';
import { AccountWriteService } from './entity-layer/account-write.service';
import { IAccountDeleteOneParams } from './entity-layer/interfaces/account-waste.interfaces';
import { IAccountFindOneParams, IAccountFindOneQuery } from './entity-layer/interfaces/account-read.interfaces';
import { Injectable } from '@nestjs/common';
import {
	IAccountCreatePayload,
	IAccountUpdateOneParams,
	IAccountUpdatePayload,
} from './entity-layer/interfaces/account-write.interfaces';

@Injectable()
export class AccountExternalService {
	constructor(
		private readonly accountReadService: AccountReadService,
		private readonly accountWriteService: AccountWriteService,
		private readonly accountWasteService: AccountWasteService
	) {}

	async findOne(params: IAccountFindOneParams, query?: IAccountFindOneQuery) {
		return this.accountReadService.findOne(params, query);
	}

	async findAndCountAll() {
		return this.accountReadService.findAndCountAll();
	}
	async create(payload: IAccountCreatePayload) {
		return this.accountWriteService.createOne(payload);
	}
	async update(
		params: IAccountUpdateOneParams,
		payload: IAccountUpdatePayload
	) {
		return this.accountWriteService.updateOne(params, payload);
	}
	async delete(params: IAccountDeleteOneParams) {
		return this.accountWasteService.delete(params);
	}
}
