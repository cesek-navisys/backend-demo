import { Account } from '@backend-demo/backend-libs/tables';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AccountReadService } from './account-read.service';
import {
	IAccountDeleteOneParams,
	IAccountDeleteOneQuery,
	IAccountRestoreOneParams,
	IAccountRestoreOneQuery,
} from './interfaces/account-waste.interfaces';

@Injectable()
export class AccountWasteService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY')
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async delete(
		params: IAccountDeleteOneParams,
		query?: IAccountDeleteOneQuery
	) {
		const { code } = params;

		const account = await this.accountReadService.findOne({
			code: code,
		});

		return this.accountRepository.destroy({
			where: {
				code: account.code,
			},
		});
	}

	async restore(
		params: IAccountRestoreOneParams,
		query?: IAccountRestoreOneQuery
	): Promise<Account> {
		const { code } = params;

		const account = await this.accountReadService.findOne({
			code: code,
		});

		if (!account.deletedAt) {
			throw new BadRequestException(`Cannot restore existing record`);
		}

		await this.accountRepository.restore({
			where: {
				code: account.code,
			},
		});

		return account;
	}
}
