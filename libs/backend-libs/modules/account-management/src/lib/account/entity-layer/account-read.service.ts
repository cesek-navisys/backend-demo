import { Account } from '@backend-demo/backend-libs/tables';
import { AccountManagementQueryService } from '../../account-management-query.service';
import { IAccountQueryOne } from '../dto/interfaces/query-account.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import {
	IAccountFindFirstParams,
	IAccountFindFirstQuery,
	IAccountFindManyParams,
	IAccountFindManyQuery,
	IAccountFindOneParams,
	IAccountFindOneQuery,
} from './interfaces/account-read.interfaces';

@Injectable()
export class AccountReadService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY') private accountRepository: typeof Account,
		private readonly accountManagementQueryService: AccountManagementQueryService
	) {}

	async findOne(
		params: IAccountFindOneParams,
		query?: IAccountFindOneQuery
	): Promise<Account> {
		const account = await this.accountRepository
			.scope(this.getScopes(query))
			.findOne({
				where: { code: params.code },
			});

		if (!account) {
			throw new NotFoundException(
				`Account with code: ${params.code} not found`
			);
		}

		return account;
	}

	async findFirst(
		params?: IAccountFindFirstParams,
		query?: IAccountFindFirstQuery
	): Promise<Account | null> {
		return this.accountRepository.scope(this.getScopes(query)).findOne({
			where: {
				email: query?.email,
				address: {
					[Op.iLike]: `%${query?.address}%`,
				},
			},
		});
	}

	async findAll(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountRepository.findAll({
			where: {
				email: query?.email,
				address: {
					[Op.iLike]: `%${query?.address}%`,
				},
			},
		});
	}

	async findAndCountAll(query?: IAccountFindManyQuery) {
		let selectedScopes = [];

		if (query?.isActive === true) {
			selectedScopes.push('showActiveOnly');
		}

		if (query?.isActive === false) {
			selectedScopes.push('showInactiveOnly');
		}

		return this.accountRepository.scope(selectedScopes).findAndCountAll();
	}

	async count(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountRepository.count({
			where: {
				email: query?.email,
				address: {
					[Op.iLike]: `%${query?.address}%`,
				},
			},
		});
	}

	async findByEmail(email: string) {
		return this.findFirst({ email });
	}

	async findByAddress(address: string) {
		return this.findFirst({ address });
	}

	private getScopes(query: IAccountQueryOne | undefined) {
		const scopes = [];
		if (query?.includeOrders) scopes.push('WITH_ORDERS');
		if (query?.includeProducts) scopes.push('WITH_PRODUCTS');
		return scopes;
	}
}
