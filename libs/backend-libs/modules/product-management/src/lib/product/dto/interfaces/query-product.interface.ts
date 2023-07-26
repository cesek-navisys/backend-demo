import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IProductQueryOne {
	includeOrderDetails?: boolean;
	includeOwner?: boolean;
}

export interface IProductQueryMany extends IQueryManyBase {}
