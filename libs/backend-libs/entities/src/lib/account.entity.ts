import { ICreationAttributesBase } from '@backend-demo/backend-libs/api-interfaces';
import { IOrderAttributes } from './order.entity';
import { IProductAttributes } from './product.entity';
import { Optional } from 'sequelize';

export interface IAccount {
	code: string;
}

export interface IAccountOwnAttributes {
	code: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	address: string;
	isActive: boolean;
}

export interface IAccountReferenceAttributes {
	Orders: IOrderAttributes[];
	Products: IProductAttributes[];
}

export interface IAccountUniqueAttributes
	extends Pick<IAccountOwnAttributes, 'code'> {}

export interface IAccountCreationAttributes
	extends Optional<IAccountOwnAttributes, 'code' | 'phone' | 'isActive'>,
		ICreationAttributesBase {
	name: string;
	surname: string;
	email: string;
	address: string;
}

export interface IAccountAttributes
	extends IAccountOwnAttributes,
		Partial<IAccountReferenceAttributes> {}
