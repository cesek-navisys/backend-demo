import { Optional } from 'sequelize';
import { IOrderDetailsUniqueAttributes } from './order-detail.entity';

export interface IOrderOwnAttributes {
	code: string;
	messageForOwner: string;
}
export interface IOrderReferenceAttributes {
	OrderDetails: IOrderDetailsUniqueAttributes[];
}

export interface IOrderUniqueAttributes
	extends Pick<IOrderOwnAttributes, 'code'> {}
export interface IOrderCreationAttributes
	extends Optional<Omit<IOrderOwnAttributes, 'code'>, 'messageForOwner'> {}
export interface IOrderAttributes
	extends IOrderOwnAttributes,
		Partial<IOrderReferenceAttributes> {}
