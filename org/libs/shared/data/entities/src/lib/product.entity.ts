import { Optional } from 'sequelize';

export enum Color {
	BLUE = 'BLUE',
	RED = 'RED',
	YELLOW = 'YELLOW',
	GREEN = 'GREEN',
}
export interface IProductOwnAttributes {
	code: string;
	name: string;
	description: string;
	price: number;
	color: Color | null;
	OwnerCode: string;
}

// Reference data to other tables
export interface IProductReferenceAttributes {
	Owner: any;
}

export interface IProductUniqueAttributes
	extends Pick<IProductOwnAttributes, 'code'> {}

// Mandatory data for a Product creation
export interface IProductCreationAttributes
	extends Optional<Omit<IProductOwnAttributes, 'code'>, 'color'> {}

export interface IProductAttributes
	extends IProductOwnAttributes,
		Partial<IProductReferenceAttributes> {}
