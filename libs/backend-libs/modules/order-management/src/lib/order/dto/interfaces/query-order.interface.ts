import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IOrderQueryOne extends IQueryManyBase {
	includeAccount?: boolean;
	includeOrderDetails?: boolean;
	filterWithOrderDetails?: boolean;
}

export interface IOrderQueryMany extends IOrderQueryOne {
	includeCount?: boolean;
}
