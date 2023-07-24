import { Account } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_REPOSITORY } from '@backend-demo/shared/constants';
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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
		@Inject(ACCOUNT_REPOSITORY)
		private readonly accountRepository: typeof Account,
		private readonly accountReadService: AccountReadService
	) {}

	async delete(
		params: IAccountDeleteOneParams,
		query: IAccountDeleteOneQuery
	): Promise<Account | undefined> {
		const account = await this.accountReadService.findOne({
			...params,
		});

		if (!account) {
			throw new NotFoundException(
				`Account with code: ${params.code} not found`
			);
		}

		this.accountRepository.destroy({
			where: {
				...params,
			},
		});

		if (!query.noReturn) {
			return account;
		}

		return undefined;
	}

	async restore(
		params: IAccountRestoreOneParams,
		query: IAccountRestoreOneQuery
	) {
		const account = await this.accountReadService.findOne({
			...params,
		});

		if (!account) {
			throw new NotFoundException(
				`Account with code: ${params.code} not found`
			);
		}

		if (!account?.deletedAt) {
			throw new BadRequestException(`Cannot restore existing record`);
		}

		this.accountRepository.restore({
			where: {
				...params,
			},
		});

		return query?.noReturn ? undefined : account;
	}
}
