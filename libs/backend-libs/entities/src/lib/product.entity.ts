import { Optional } from 'sequelize';
import { Color } from '@backend-demo/shared/enums';
import { IAccountAttributes } from './account.entity';

export interface IProductOwnAttributes {
	code: string;
	name: string;
	description: string;
	price: number;
	color: Color | null;
	AccountCode: string;
}

// Reference data to other tables
export interface IProductReferenceAttributes {
	Owner: IAccountAttributes;
}

export interface IProductUniqueAttributes
	extends Pick<IProductOwnAttributes, 'code'> {}

// Mandatory data for a Product creation
export interface IProductCreationAttributes
	extends Optional<IProductOwnAttributes, 'code' | 'color'> {}

export interface IProductAttributes
	extends IProductOwnAttributes,
		Partial<IProductReferenceAttributes> {}
