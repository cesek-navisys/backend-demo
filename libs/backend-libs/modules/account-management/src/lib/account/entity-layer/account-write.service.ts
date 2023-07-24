import { Account } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_REPOSITORY } from '@backend-demo/shared/constants';
import { AccountReadService } from './account-read.service';
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IAccountCreate } from '../dto/interfaces/create-account.interface';
import {
	IAccountCreateOneParams,
	IAccountCreateOneQuery,
	IAccountUpdateOneParams,
	IAccountUpdateOneQuery,
} from './interfaces/account-write.interfaces';
import { IAccountUpdate } from '../dto/interfaces/update-account.interface';
/**
 * inject AccountReadService v constructoru
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
		@Inject(ACCOUNT_REPOSITORY)
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async createOne(
		createAccount: IAccountCreate,
		params?: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	): Promise<Account | undefined> {
		try {
			return query?.noReturn
				? this.accountRepository.create({
						...createAccount,
				  })
				: undefined;
		} catch (e) {
			throw new BadRequestException(
				`Account with those attributes: ${createAccount} cannot be created`
			);
		}
		// Vyhodí mi to výjimku???
	}

	async updateOne(
		updateAccount: IAccountUpdate,
		params: IAccountUpdateOneParams,
		query?: IAccountUpdateOneQuery
	): Promise<Account | undefined> {
		const account = await this.accountReadService.findOne({
			...params,
		});

		if (!account) {
			throw new NotFoundException(
				`Account with code: ${params.code} not found`
			);
		}

		this.accountRepository.update(
			{ ...updateAccount },
			{ where: { ...params } }
		);

		return query?.noReturn ? undefined : account;
	}

	async createMany(
		accounts: IAccountCreate[],
		params?: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	) {
		await Promise.all([
			accounts.forEach((account) => this.createOne(account)),
		]);
	}

	async updateMany(
		accounts: IAccountCreate[],
		params?: IAccountCreateOneParams,
		query?: IAccountCreateOneQuery
	) {
		await Promise.all([
			accounts.forEach((account) => this.createOne(account)),
		]);
	}
}
