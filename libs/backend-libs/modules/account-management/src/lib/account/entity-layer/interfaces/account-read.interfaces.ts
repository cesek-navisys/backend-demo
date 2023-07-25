import { IAccountQueryOne } from '../../dto/interfaces/query-account.interface';

interface IAccountSearchableParams {
	/**
	 * You can search by substring (case insensitive)
	 */
	address?: string;
	email?: string;
}

export interface IAccountFindOneParams {
	code: string;
}
export interface IAccountFindOneQuery extends IAccountQueryOne {}

export interface IAccountFindManyParams extends IAccountSearchableParams {}
export interface IAccountFindManyQuery {}

export interface IAccountFindFirstParams extends IAccountSearchableParams {}
export interface IAccountFindFirstQuery extends IAccountQueryOne {}
