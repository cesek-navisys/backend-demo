import {
	IProductQueryMany,
	IProductQueryOne,
} from '../../dto/interfaces/query-product.interface';

export interface IProductFindOneParams {
	productCode: string;
	accountCode: string;
}

export interface IProductFindOneQuery extends IProductQueryOne {}

export interface IProductFindManyParams
	extends Pick<IProductFindFirstParams, 'accountCode'> {}

export interface IProductFindManyQuery extends IProductQueryMany {}

export interface IProductFindFirstParams
	extends Pick<IProductFindOneParams, 'accountCode'> {}

export interface IProductFindFirstQuery extends IProductFindOneQuery {}
