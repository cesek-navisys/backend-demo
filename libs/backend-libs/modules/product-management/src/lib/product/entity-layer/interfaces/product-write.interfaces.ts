import { IProductCreate } from '../../dto/interfaces/create-product.interface';
import { IProductFindOneParams } from './product-read.interfaces';

export interface ICreateProduct extends IProductCreate {}

export interface IProductCreateParams
	extends Pick<IProductFindOneParams, 'accountCode'> {}

export interface IUpsertProduct extends Partial<ICreateProduct> {}

export interface IProductUpsertParams extends IProductCreateParams {}

export interface IUpdateProduct extends IUpsertProduct {}

export interface IProductUpdateParams extends IProductFindOneParams {}

export interface IProductUpdateManyParams
	extends Omit<IProductFindOneParams, 'productCode'> {}

export interface IUpdateManyProduct extends IUpdateProduct {
	productCode: string;
}
