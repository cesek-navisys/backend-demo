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
import { IOrderQueryMany, IOrderQueryOne } from '../../dto';

export interface IOrderFindOneParams
	extends Pick<IOrderAttributes, 'code' | 'AccountCode'> {}

export interface IOrderFindOneQuery extends IOrderQueryOne {}

export interface IOrderFindFirstParams
	extends Optional<
		Pick<IOrderAttributes, 'AccountCode' | 'messageForOwner'>,
		'AccountCode' | 'messageForOwner'
	> {}

export interface IOrderFindFirstQuery extends IOrderFindOneQuery {}

export interface IOrderFindManyParams extends IOrderFindFirstParams {}

export interface IOrderFindManyQuery extends IOrderQueryMany {}

export interface IOrderFindAndCountManyQuery extends IOrderFindManyQuery {
	limit: number;
	page: number;
}
