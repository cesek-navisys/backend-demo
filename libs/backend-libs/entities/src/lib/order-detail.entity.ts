import { Optional } from 'sequelize';
import { IProductAttributes } from './product.entity';
import { IOrderAttributes } from './order.entity';

export interface IOrderDetailsOwnAttributes {
	code: string;
	quantity: number;
	totalPrice: number;
	canBeDeliveredSeparately: boolean;
	OrderCode: string;
	ProductCode: string;
}

export interface IOrderDetailsReferenceAttributes {
	Order: IOrderAttributes;
	Product: IProductAttributes;
}

export interface IOrderDetailsUniqueAttributes
	extends Pick<IOrderDetailsOwnAttributes, 'code'> {}

export interface IOrderDetailsCreationAttributes
	extends Optional<
		Omit<IOrderDetailsOwnAttributes, 'code'>,
		'canBeDeliveredSeparately' | 'totalPrice'
	> {}

export interface IOrderDetailsAttributes
	extends IOrderDetailsOwnAttributes,
		Partial<IOrderDetailsReferenceAttributes> {}
