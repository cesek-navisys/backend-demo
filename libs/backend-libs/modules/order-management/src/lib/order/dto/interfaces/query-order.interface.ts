/**
 * IOrderQueryOne
 * IOrderQueryMany
 */

import { IOrderFindOneQuery } from '../../entity-layer/interfaces/order-read.interfaces';

export interface IOrderQueryOne {
	includeAccount?: boolean;
	includeOrderDetails?: boolean;
}

export interface IOrderQueryMany extends IOrderQueryOne {
	includeCount?: boolean;
}
