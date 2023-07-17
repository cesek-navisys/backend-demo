import { Optional } from 'sequelize';

export interface IOrderOwnAttributes {
	code: string;
	messageForOwner: string;
}
export interface IOrderReferenceAttributes {
	OrderDetails: any[];
}

export interface IOrderUniqueAttributes
	extends Pick<IOrderOwnAttributes, 'code'> {}
export interface IOrderCreationAttributes
	extends Optional<Omit<IOrderOwnAttributes, 'code'>, 'messageForOwner'> {}
export interface IOrderAttributes
	extends IOrderOwnAttributes,
		IOrderReferenceAttributes {}
