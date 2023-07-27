import { Account, Order, Product } from '@backend-demo/backend-libs/tables';
import {
	IAccountFindFirstParams,
	IAccountFindFirstQuery,
	IAccountFindManyParams,
	IAccountFindManyQuery,
	IAccountFindOneParams,
	IAccountFindOneQuery,
} from './interfaces/account-read.interfaces';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { IAccountQueryOne } from '../dto/interfaces/query-account.interface';

@Injectable()
export class AccountReadService {
	constructor(
		@Inject('ACCOUNT_REPOSITORY') private accountRepository: typeof Account
	) {}

	async findOne(
		params: IAccountFindOneParams,
		query?: IAccountFindOneQuery
	): Promise<Account> {
		const account = await this.accountRepository.findOne({
			where: { code: params.accountCode },
			include: query?.includeOrders ? Order : undefined,
		});

		if (!account) {
			throw new NotFoundException(
				`Account with code: ${params.accountCode} not found`
			);
		}
		return account;
	}

	async findFirst(
		params?: IAccountFindFirstParams,
		query?: IAccountFindFirstQuery
	): Promise<Account | null> {
		return this.accountRepository.findOne({
			where: {
				email: query?.email,
				address: {
					[Op.iLike]: `%${query?.address}%`,
				},
			},
			include: this.getIncludeList(query),
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

	async findAndCountAll(
		params?: IAccountFindManyParams,
		query?: IAccountFindManyQuery
	) {
		return this.accountRepository.findAndCountAll({
			where: {
				email: query?.email,
				address: {
					[Op.iLike]: `%${query?.address}%`,
				},
			},
		});
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

	private getIncludeList(query: IAccountQueryOne | undefined) {
		const includes = [];
		if (query?.includeOrders) includes.push(Order);
		if (query?.includeProducts) includes.push(Product);
		return includes;
	}
}
function InjectRepository(
	arg0: string
): (
	target: typeof AccountReadService,
	propertyKey: undefined,
	parameterIndex: 0
) => void {
	throw new Error('Function not implemented.');
}
