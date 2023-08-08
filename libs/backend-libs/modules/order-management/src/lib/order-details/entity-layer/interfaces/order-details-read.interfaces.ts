import {
	IOrderDetailsQueryMany,
	IOrderDetailsQueryOne,
} from '../../dto/interfaces/query-order-details.interface';

export interface IOrderDetailsFindOneParams {
	orderDetailsCode: string;
	orderCode: string;
}

export interface IOrderDetailsFindOneQuery extends IOrderDetailsQueryOne {}

export interface IOrderDetailsFindFirstParams
	extends Omit<IOrderDetailsFindOneParams, 'orderDetailsCode'> {
	productCode?: string;
}

export interface IOrderDetailsFindFirstQuery
	extends IOrderDetailsFindOneQuery {}

export interface IOrderDetailsFindManyParams
	extends Pick<IOrderDetailsFindOneParams, 'orderCode'> {}

export interface IOrderDetailsFindManyQuery extends IOrderDetailsQueryMany {}
