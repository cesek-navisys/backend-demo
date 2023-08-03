import { Account } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import { AccountReadService } from './account-read.service';
import type {
	IAccountCreateManyParams,
	IAccountCreatePayload,
	IAccountUpdateOneParams,
	IAccountUpdatePayload,
	IAccountUpsertPayload,
} from './interfaces/account-write.interfaces';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IAccountCreationAttributes } from '@backend-demo/backend-libs/entities';
import {
	CreateAccountAfterEvent,
	CreateAccountBeforeEvent,
	EventName,
} from '@backend-demo/backend-libs/events';

@Injectable()
export class AccountWriteService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY')
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService,
		private readonly eventEmitter: EventEmitter2
	) { }

	async createOne(payload: IAccountCreatePayload): Promise<Account> {
		const { address, email, name, phone, surname } = payload;

		const accountToCreate: IAccountCreationAttributes = {
			address,
			email,
			name,
			surname,
			phone,
		};

		return this.accountRepository.sequelize!.transaction(async () => {
			await this.eventEmitter.emitAsync(
				'create.account:before' as EventName,
				{
					accountBeforeCreation: accountToCreate,
				} as CreateAccountBeforeEvent
			);
			const account = await this.accountRepository.create(
				accountToCreate,
			);

			await this.eventEmitter.emitAsync(
				'create.account:after' as EventName,
				{
					account,
					accountBeforeCreation: accountToCreate,
				} as CreateAccountAfterEvent
			);
			return account;
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

		const [_, affectedRows] = await this.accountRepository.update(
			{
				name,
				surname,
				address,
				email,
				phone,
			},
			{ where: { code: account.code }, returning: true }
		);

		return affectedRows[0];
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
