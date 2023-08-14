import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IOrderDetailsQueryOne extends IQueryManyBase {
	includeProduct?: boolean;
	includeOrder?: boolean;
}

export interface IOrderDetailsQueryMany extends IOrderDetailsQueryOne {}
