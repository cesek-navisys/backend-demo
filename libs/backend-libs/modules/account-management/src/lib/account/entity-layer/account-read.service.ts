import { Account } from '@backend-demo/backend-libs/tables';
import { AccountManagementQueryService } from '../../account-management-query.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import {
	IAccountQueryMany,
	IAccountQueryOne,
} from '../dto/interfaces/query-account.interface';
import {
	EmptyDateStringListError,
	InvalidDateError,
	WrongDateStringFormatError,
} from './account-read.errors';
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
			.scope(this.getQueryOneScopes(query))
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
		return this.accountRepository
			.scope(this.getQueryOneScopes(query))
			.findOne({
				where: {
					email: query?.email,
					address: {
						[Op.iLike]: `%${query?.address}%`,
					},
				},
			});
	}

	async findAll(query?: IAccountFindManyQuery) {
		let selectedScopes = this.getQueryManyScopes(query);

		return this.accountRepository.scope(selectedScopes).findAll();
	}

	async findAndCountAll(query?: IAccountFindManyQuery) {
		let selectedScopes = this.getQueryManyScopes(query);

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

	getHourFrequencyFromDateStrings(dateStrings: string[]) {
		const hoursInDay = Array.from(Array(24).keys());
		let validatedDates: Date[] = [];

		if (dateStrings.length === 0) throw new EmptyDateStringListError();

		for (const dateString of dateStrings) {
			if (isNaN(Date.parse(dateString)))
				throw new InvalidDateError(dateString);

			if (!dateString.includes('T'))
				throw new WrongDateStringFormatError(dateString);

			validatedDates.push(new Date(dateString));
		}

		return hoursInDay.reduce((result, current) => {
			const currentResult = result[current] || 0;
			const frequency =
				validatedDates.filter((date) => date.getHours() == current)
					.length / validatedDates.length;
			const frequencyRounded = Math.floor(frequency * 100) / 100;
			return (
				(result[current] = +(currentResult + frequencyRounded)), result
			);
		}, {} as Record<string, number>);
	}

	private getQueryOneScopes(query: IAccountQueryOne | undefined) {
		const scopes = [];
		if (query?.includeOrders) scopes.push('WITH_ORDERS');
		if (query?.includeProducts) scopes.push('WITH_PRODUCTS');
		return scopes;
	}

	private getQueryManyScopes(query: IAccountQueryMany | undefined) {
		let scopes = [];

		if (query?.isActive === true) {
			scopes.push('showActiveOnly');
		}

		if (query?.isActive === false) {
			scopes.push('showInactiveOnly');
		}

		return scopes;
	}
}
