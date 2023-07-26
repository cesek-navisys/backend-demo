/**
 * IOrderQueryOne
 * IOrderQueryMany
 */

// Temporary interface to be implemented in a different lib
export interface IPaginationQuery {
	page?: number;
	limit?: number;
}

export interface IOrderQueryOne extends IPaginationQuery {
	includeAccount?: boolean;
	includeOrderDetails?: boolean;
}

export interface IOrderQueryMany extends IOrderQueryOne {
	includeCount?: boolean;
}
