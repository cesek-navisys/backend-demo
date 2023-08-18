import { ICreationAttributesBase } from '@backend-demo/backend-libs/api-interfaces';
import { IOrderAttributes } from './order.entity';
import { IProductAttributes } from './product.entity';
import { Optional } from 'sequelize';

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
			IOrderDetailsOwnAttributes,
			'code' | 'canBeDeliveredSeparately' | 'totalPrice'
		>,
		ICreationAttributesBase {}

export interface IOrderDetailsAttributes
	extends IOrderDetailsOwnAttributes,
		Partial<IOrderDetailsReferenceAttributes> {}
