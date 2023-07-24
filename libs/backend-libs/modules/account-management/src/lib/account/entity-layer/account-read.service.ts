/**
 * accountRepository from accountProvider
 *
 * findOne(params: IAccountFindOneParams, query?: IAccountFindOneQuery)
 * findFirst
 * findAll
 * findAndCountAll
 * count
 */

import { Account, Order } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_REPOSITORY } from '@backend-demo/shared/constants';
import {
	IAccountFindFirstParams,
	IAccountFindFirstQuery,
	IAccountFindManyParams,
	IAccountFindManyQuery,
	IAccountFindOneParams,
	IAccountFindOneQuery,
} from './interfaces/account-read.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class AccountReadService {
	constructor(
		@Inject(ACCOUNT_REPOSITORY)
		private readonly accountRepository: typeof Account
	) {}

	async findOne(params: IAccountFindOneParams, query?: IAccountFindOneQuery) {
		return this.accountRepository.findOne({
			where: { ...params },
			include: query?.includeOrders ? Order : undefined,
		});
	}

	async findFirst(
		params: IAccountFindFirstParams,
		query?: IAccountFindFirstQuery
	) {
		const { email } = query ?? {}; // Object destruction
		return this.accountRepository.findOne({
			where: {
				email,
				address: {
					[Op.iLike]: `%${query?.address}%`
				}
			}
		});
	}

	async findAll(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountRepository.findAll({
			where: {
				address: {
					[Op.iLike]: `%${query?.address}%`
				}
			}
	});
	}

	async findAndCountAll(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountRepository.findAndCountAll();
	}

	async count() {
		return this.accountRepository.count();
	}

	async findByEmail(email: string) {
		return this.findFirst({ email });
	}

	async function findByAddress(address: string) {
		return this.findFirst()
	}
}
