import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IOrderQueryOne extends IQueryManyBase {
	includeAccount?: boolean;
	includeOrderDetails?: boolean;
	filterWithOrderDetails?: boolean;
	totalPrice?: number;
}

export interface IOrderQueryMany extends IOrderQueryOne {
	includeCount?: boolean;
}
