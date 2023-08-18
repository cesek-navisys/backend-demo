import { IAccountAttributes } from './account.entity';
import { ICreationAttributesBase } from '@backend-demo/backend-libs/api-interfaces';
import { IOrderDetailsUniqueAttributes } from './order-detail.entity';
import { Optional } from 'sequelize';

export interface IOrderOwnAttributes {
	code: string;
	messageForOwner: string;
	confirmed: boolean;
	AccountCode: string;
}
export interface IOrderReferenceAttributes {
	OrderDetails: IOrderDetailsUniqueAttributes[];
	Account: IAccountAttributes;
}

export interface IOrderUniqueAttributes
	extends Pick<IOrderOwnAttributes, 'code'> {}

export interface IOrderCreationAttributes
	extends Optional<
			IOrderOwnAttributes,
			'code' | 'messageForOwner' | 'confirmed' | 'AccountCode'
		>,
		ICreationAttributesBase {}

export interface IOrderAttributes
	extends IOrderOwnAttributes,
		Partial<IOrderReferenceAttributes> {}
