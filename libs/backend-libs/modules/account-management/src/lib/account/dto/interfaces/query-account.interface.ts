import { IQueryManyBase } from '@backend-demo/backend-libs/api-interfaces';

export interface IAccountQueryOne {
	includeOrders?: boolean;
	includeProducts?: boolean;
}
export interface IAccountQueryMany extends IQueryManyBase {
}