/**
 * IOrderFindOneParams
 * IOrderFindOneQuery
 *
 * IOrderFindManyParams
 * IOrderFindManyQuery
 *
 * IOrderFindFirstParams
 * IOrderFindFirstQuery
 */

import { IOrderAttributes } from '@backend-demo/backend-libs/entities';
import { Optional } from 'sequelize';

export interface IOrderFindOneParams extends Pick<IOrderAttributes, 'code'> {}

export interface IOrderFindOneQuery {
	includeAccount: boolean;
}
export interface IOrderFindFirstParams
	extends Optional<
		Pick<IOrderAttributes, 'AccountCode' | 'messageForOwner'>,
		'AccountCode' | 'messageForOwner'
	> {}

export interface IOrderFindFirstQuery {
	includeAccount: boolean;
}

export interface IOrderFindManyParams
	extends Optional<
		Pick<IOrderAttributes, 'AccountCode' | 'messageForOwner'>,
		'AccountCode' | 'messageForOwner'
	> {}

export interface IOrderFindManyQuery {
	includeAccount: boolean;
}

export interface IOrderFindAndCountManyQuery extends IOrderFindManyQuery {
	limit: number;
	page: number;
}
