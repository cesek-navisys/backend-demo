import { ICreationAttributesBase } from '@backend-demo/backend-libs/api-interfaces';
import { IProductAttributes } from './product.entity';
import { ProductSizeName } from '@backend-demo/shared/enums';

export interface IProductSize {
	code: string;
}

export interface IProductSizeOwnAttributes {
	code: string;
	name: ProductSizeName;
	weight: number;
	ProductCode: string;
}

export interface IProductSizeReferenceAttributes {
	Product: IProductAttributes;
}

export interface IProductSizeUniqueAttributes
	extends Pick<IProductSizeOwnAttributes, 'code'> {}

export interface IProductSizeCreationAttributes
	extends IProductSizeOwnAttributes,
		ICreationAttributesBase {}

export interface IProductSizeAttributes
	extends IProductSizeOwnAttributes,
		Partial<IProductSizeReferenceAttributes> {}
