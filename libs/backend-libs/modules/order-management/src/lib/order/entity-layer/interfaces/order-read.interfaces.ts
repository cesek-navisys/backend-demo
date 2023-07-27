/**
 * IOrderFindOneParams
 * IOrderFindOneQuery
 *
 * IOrderFindManyParams
 * IOrderFindManyQuery
 *
 * IOrderFindFirstParams
 * IOrderFindFirstQuery
 */

import {
	IOrderAttributes,
	IOrderUniqueAttributes,
} from '@backend-demo/backend-libs/entities';
import { Optional } from 'sequelize';
import { IOrderQueryMany, IOrderQueryOne } from '../../dto/interfaces';

export interface IOrderFindOneParams extends IOrderUniqueAttributes { }

export interface IOrderFindOneQuery extends IOrderQueryOne { }

export interface IOrderFindFirstParams
	extends Optional<
		Pick<IOrderAttributes, 'AccountCode' | 'messageForOwner' | 'confirmed'>,
		'AccountCode' | 'messageForOwner' | 'confirmed'
	> { }

export interface IOrderFindFirstQuery extends IOrderFindOneQuery { }

export interface IOrderFindManyParams extends IOrderFindFirstParams { }

export interface IOrderFindManyQuery extends IOrderQueryMany { }

export interface IOrderFindAndCountManyQuery extends IOrderFindManyQuery { }
