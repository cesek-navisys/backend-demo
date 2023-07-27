import { Account } from '@backend-demo/backend-libs/tables';
import { AccountReadService } from './account-read.service';
import { Inject, Injectable } from '@nestjs/common';
import {
	IAccountCreateManyParams,
	IAccountCreateManyQuery,
	IAccountCreateOneParams,
	IAccountCreateOneQuery,
	IAccountUpdateManyParams,
	IAccountUpdateManyQuery,
	IAccountUpdateOneParams,
	IAccountUpdateOneQuery,
	IAccountUpsertOneParams,
	IAccountUpsertOneQuery,
} from './interfaces/account-write.interfaces';
import { IAccountCreate } from '../dto/interfaces/create-account.interface';
import { IAccountUpdate } from '../dto/interfaces/update-account.interface';
/**
 * inject AccountReadService v konstruktoru
 *
 * transaction -- na konci (možná bude libka transactionService)
 * createOne
 * createMany
 * upsertOne
 * updateOne
 * updateMany
 */

@Injectable()
export class AccountWriteService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY')
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async createOne(
		payload: IAccountCreate,
		params?: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	): Promise<Account> {
		const { address, email, name, phone, surname } = payload;

		return this.accountRepository.create({
			address,
			email,
			name,
			surname,
			phone,
		});
	}

	async updateOne(
		payload: IAccountUpdate,
		params: IAccountUpdateOneParams,
		query?: IAccountUpdateOneQuery
	) {
		const { address, email, name, phone, surname } = payload;
		const { code } = params;

		const account = await this.accountReadService.findOne({
			code,
		});

		return this.accountRepository.update(
			{
				name,
				surname,
				address,
				email,
				phone,
			},
			{ where: { code: account.code } }
		);
	}

	async createMany(
		payload: IAccountCreate[],
		params?: IAccountCreateManyParams,
		query?: IAccountCreateManyQuery
	) {
		const accounts: Account[] = [];
		payload.forEach(async (account) =>
			accounts.push(await this.createOne(account))
		);
		return accounts
	}

	//TODO: Think how to use it
	async updateMany(
		payload: IAccountUpdate[],
		params?: IAccountUpdateManyParams,
		query?: IAccountUpdateManyQuery
	) {}

	async upsertOne(
		payload: IAccountCreate,
		params?: IAccountUpsertOneParams,
		query?: IAccountUpsertOneQuery
	): Promise<Account> {
		const { address, email, name, phone, surname } = payload;
		const [instance, created] = await this.accountRepository.upsert({
			address,
			email,
			name,
			surname,
			phone,
		});
		return instance;
	}
}
