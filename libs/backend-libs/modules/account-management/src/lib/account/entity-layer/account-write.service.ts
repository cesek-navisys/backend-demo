import { Account } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import { AccountReadService } from './account-read.service';
import {
	IAccountCreateManyParams,
	IAccountCreatePayload,
	IAccountUpdateOneParams,
	IAccountUpdatePayload,
	IAccountUpsertPayload,
} from './interfaces/account-write.interfaces';

@Injectable()
export class AccountWriteService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY')
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async createOne(payload: IAccountCreatePayload): Promise<Account> {
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
		params: IAccountUpdateOneParams,
		payload: IAccountUpdatePayload
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
		params: IAccountCreateManyParams,
		payload: IAccountCreatePayload[]
	) {
		const accounts: Account[] = [];
		payload.forEach(async (account) =>
			accounts.push(await this.createOne(account))
		);
		return accounts;
	}

	// async updateMany(
	// 	payload: IAccountUpdatePayload[],
	// 	params?: IAccountUpdateManyParams,
	// 	query?: IAccountUpdateManyQuery
	// ) {}

	async upsertOne(payload: IAccountUpsertPayload): Promise<Account> {
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
