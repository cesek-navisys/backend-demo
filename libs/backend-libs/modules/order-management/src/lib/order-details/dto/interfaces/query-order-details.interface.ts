import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IOrderDetailsQueryOne extends IQueryManyBase {
	includeProduct?: boolean;
}

export interface IOrderDetailsQueryMany extends IOrderDetailsQueryOne {
	includeCount?: boolean;
}
