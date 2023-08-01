import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IProductQueryOne extends IQueryManyBase {
	includeOrderDetails?: boolean;
	includeAccount?: boolean;
}

export interface IProductQueryMany extends IProductQueryOne {}
