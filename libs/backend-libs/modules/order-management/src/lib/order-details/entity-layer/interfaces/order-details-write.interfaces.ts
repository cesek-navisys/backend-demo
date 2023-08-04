import { IOrderDetailsCreate } from '../../dto/interfaces/create-order-details.interface';
import { IOrderDetailsFindOneParams } from './order-details-read.interfaces';

export interface ICreateOrderDetails extends IOrderDetailsCreate {}

export interface IOrderDetailsCreateParams
	extends Pick<IOrderDetailsFindOneParams, 'orderCode'> {
	productCode: string;
}

export interface IOrderDetailsUpsertParams extends IOrderDetailsCreateParams {}

export interface IUpsertOrderDetails extends Partial<ICreateOrderDetails> {}

export interface IOrderDetailsUpdateParams extends IOrderDetailsFindOneParams {}

export interface IOrderDetailsUpdateManyParams
	extends Pick<IOrderDetailsFindOneParams, 'orderCode'> {}

export interface IUpdateOrderDetails extends IUpsertOrderDetails {}
