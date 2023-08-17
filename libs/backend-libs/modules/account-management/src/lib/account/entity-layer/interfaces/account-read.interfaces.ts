import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';
import { IAccountQueryOne } from '../../dto/interfaces/query-account.interface';

interface IAccountSearchableQuery {
	/**
	 * You can search by substring (case insensitive)
	 */
	address?: string;
	/**
	 * You can search by whole string
	 */
	email?: string;
}

export interface IAccountFindOneParams {
	code: string;
}
export interface IAccountFindOneQuery extends IAccountQueryOne {}

export interface IAccountFindManyParams {}
export interface IAccountFindManyQuery
	extends IQueryManyBase,
		IAccountSearchableQuery {
	isActive?: boolean;
}

export interface IAccountFindFirstParams {}
export interface IAccountFindFirstQuery
	extends IAccountQueryOne,
		IAccountSearchableQuery {}
