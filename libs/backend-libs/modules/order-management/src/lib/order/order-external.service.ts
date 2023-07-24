/**
 * je totéž, co controller - tzn. bude mít stejné metody i parametry
 * jako parametry bude používat interfaces
 *
 * findOne(accountCode: string, orderCode: string, query?: IOrderQueryOne)
 *
 */

import { OrderReadService } from './entity-layer/order-read.service';
import { OrderWriteService } from './entity-layer/order-write.service';
import { OrderWasteService } from './entity-layer/order-waste.service';
import { IOrderQueryMany, IOrderQueryOne } from './dto';
import {
	IOrderFindAndCountManyQuery,
	IOrderFindFirstParams,
	IOrderFindManyParams,
	IOrderFindManyQuery,
} from './entity-layer/interfaces/order-read.interfaces';
import {
	IOrderCreateOneParams,
	IOrderUpdateManyParams,
	IOrderUpdateOneParams,
	IOrderUpsertOneParams,
} from './entity-layer/interfaces/order-write.interfaces';
import { IOrderRestoreParams } from './entity-layer/interfaces/order-waste.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderExternalService {
	constructor(
		private orderReadService: OrderReadService,
		private orderWriteService: OrderWriteService,
		private orderWasteService: OrderWasteService
	) {}

	async findOne(
		accountCode: string,
		orderCode: string,
		query?: IOrderQueryOne
	) {
		return this.orderReadService.findOne(
			{
				code: orderCode,
				AccountCode: accountCode,
			},
			query
		);
	}

	async findAll(params: IOrderFindManyParams, query?: IOrderQueryMany) {
		return this.orderReadService.findAll(params, query);
	}

	async findFirst(params: IOrderFindFirstParams, query?: IOrderQueryOne) {
		return this.orderReadService.findFirst(params, query);
	}

	async count(params: IOrderFindManyParams) {
		return this.orderReadService.count(params);
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	) {
		return this.orderReadService.findAndCountAll(params, query);
	}

	async create(params: IOrderCreateOneParams) {
		return this.orderWriteService.createOne(params);
	}

	async createMany(params: IOrderCreateOneParams[]) {
		return this.orderWriteService.createMany(params);
	}

	async updateOne(
		accountCode: string,
		orderCode: string,
		params: IOrderUpdateOneParams
	) {
		return this.orderWriteService.updateOne(accountCode, orderCode, params);
	}

	async updateMany(params: IOrderUpdateManyParams[]) {
		return this.orderWriteService.updateMany(params);
	}

	async upsertOne(params: IOrderUpsertOneParams) {
		return this.orderWriteService.upsertOne(params);
	}
	async delete(accountCode: string, orderCode: string, force?: boolean) {
		return this.orderWasteService.delete(accountCode, orderCode, force);
	}

	async restore(
		accountCode: string,
		orderCode: string,
		params: IOrderRestoreParams
	) {
		return this.orderWasteService.restore(accountCode, orderCode, params);
	}
}
