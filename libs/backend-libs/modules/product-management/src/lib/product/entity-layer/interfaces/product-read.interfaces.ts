import {
	IProductAttributes,
	IProductUniqueAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	IProductQueryMany,
	IProductQueryOne,
} from '../../dto/interfaces/query-product.interface';
import { Optional } from 'sequelize';

export interface IProductFindOneParams extends IProductUniqueAttributes {}

export interface IProductFindOneQuery extends IProductQueryOne {}

export interface IProductFindManyParams {
	OwnerCode: string;
}

export interface IProductFindManyQuery extends IProductQueryMany {}

export interface IProductFindFirstParams
	extends Optional<IProductAttributes, 'description' | 'price' | 'color'> {}

export interface IProductFindFirstQuery extends IProductFindOneQuery {}
