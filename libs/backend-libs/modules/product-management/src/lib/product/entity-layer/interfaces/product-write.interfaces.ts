import { IProductCreate } from '../../dto/interfaces/create-product.interface';
import { IProductUpdate } from '../../dto/interfaces/update-product.interface';

export interface IProductCreateOneParams extends IProductCreate {}

export interface IProductCreateManyParams {
	products: IProductCreateOneParams[];
}

export interface IProductUpsertOneParams extends IProductCreateOneParams {
	code: string;
}

export interface IProductUpdateOneParams extends Partial<IProductUpdate> {
	code: string;
}

export interface IProductUpdateManyParams extends Partial<IProductUpdate> {
	OwnerCode: string;
}
