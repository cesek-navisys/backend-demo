/**
 * IOrderQueryOne
 * IOrderQueryMany
 */

export interface IOrderQueryOne {
	includeAccount?: boolean;
	includeOrderDetails?: boolean;
}

export interface IOrderQueryMany extends IOrderQueryOne {
	includeCount?: boolean;
}
