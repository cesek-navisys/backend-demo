import {
	IOrderAttributes,
	IOrderCreationAttributes,
	IOrderUniqueAttributes,
} from '@backend-demo/backend-libs/entities';
import { IOrderCreate } from '../../dto/interfaces';

export interface IOrderCreatePayload extends IOrderCreate { }

export interface IOrderUpsertOneParams extends IOrderCreationAttributes { }

export interface IOrderUpdateOneParams extends IOrderCreationAttributes { }

export interface IOrderUpdateManyParams
	extends IOrderCreationAttributes,
	IOrderUniqueAttributes { }
