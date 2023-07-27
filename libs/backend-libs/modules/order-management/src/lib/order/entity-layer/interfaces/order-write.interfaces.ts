import { Optional } from 'sequelize';
import { IOrderCreate } from '../../dto/interfaces';
import { IOrderFindOneParams } from './order-read.interfaces';

export interface ICreateOrder extends IOrderCreate {}
export interface IOrderCreateParams
	extends Pick<IOrderFindOneParams, 'accountCode'> {}

export interface IOrderUpsertParams extends IOrderCreateParams {}

export interface IUpsertOrder
	extends Optional<ICreateOrder, 'confirmed' | 'messageForOwner'> {}

export interface IOrderUpdateParams extends IOrderFindOneParams {}

export interface IOrderUpdateParams extends IOrderFindOneParams {}

export interface IOrderUpdateManyParams
	extends Omit<IOrderFindOneParams, 'orderCode'> {}

export interface IUpdateOrder extends IUpsertOrder {}

export interface IUpdateManyOrder extends IUpdateOrder {
	orderCode: string;
}
