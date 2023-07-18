import { Optional } from 'sequelize';
import { IProductAttributes } from './product.entity';
import { IOrderAttributes } from './order.entity';

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
}

export interface IAccountReferenceAttributes {
	Orders: IOrderAttributes[];
	Products: IProductAttributes[];
}

export interface IAccountUniqueAttributes
	extends Pick<IAccountOwnAttributes, 'code'> {}

export interface IAccountCreationAttributes
	extends Optional<Omit<IAccountOwnAttributes, 'code'>, 'phone'> {
	name: string;
	surname: string;
	email: string;
	address: string;
}

export interface IAccountAttributes
	extends IAccountOwnAttributes,
		Partial<IAccountReferenceAttributes> {}
