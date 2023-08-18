import { ProductSizeName } from '@backend-demo/shared/enums';
import { IProductAttributes } from './product.entity';

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
    extends Pick<IProductSizeOwnAttributes, 'code'> { }

export interface IProductSizeCreationAttributes
    extends
    Omit<IProductSizeOwnAttributes, 'code'> {
}

export interface IProductSizeAttributes
    extends IProductSizeOwnAttributes,
    Partial<IProductSizeReferenceAttributes> { }
