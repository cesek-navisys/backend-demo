import { IOrderQueryMany, IOrderQueryOne } from '../../dto/interfaces';

export interface IOrderFindOneParams {
	accountCode: string;
	orderCode: string;
}

export interface IOrderFindOneQuery extends IOrderQueryOne {}

export interface IOrderFindFirstParams extends Omit<IOrderFindOneParams, 'orderCode'> {}

export interface IOrderFindFirstQuery extends IOrderFindOneQuery {
	confirmed?: boolean
}

export interface IOrderFindManyParams
	extends Omit<IOrderFindFirstParams, 'orderCode'> {}

export interface IOrderFindManyQuery extends IOrderQueryMany {}

export interface IOrderFindAndCountManyQuery extends IOrderFindManyQuery {}
