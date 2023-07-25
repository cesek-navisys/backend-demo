import {
	IOrderAttributes,
	IOrderCreationAttributes,
} from '@backend-demo/backend-libs/entities';

export interface IOrderCreateOneParams extends IOrderCreationAttributes {}

export interface IOrderUpsertOneParams extends IOrderCreationAttributes {}

export interface IOrderUpdateOneParams extends IOrderCreationAttributes {}

export interface IOrderUpdateManyParams extends IOrderAttributes {}
