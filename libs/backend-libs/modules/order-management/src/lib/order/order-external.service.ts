/**
 * je totéž, co controller - tzn. bude mít stejné metody i parametry
 * jako parametry bude používat interfaces
 *
 * findOne(accountCode: string, orderCode: string, query?: IOrderQueryOne)
 *
 */

import { Injectable } from '@nestjs/common';
import { OrderBasketService } from './domain-layer/order-basket.service';
import { OrderConfirmedService } from './domain-layer/order-confirmed.service';
import { IOrderQueryOne } from './dto/interfaces';
import {
  IOrderFindAndCountManyQuery,
  IOrderFindFirstParams,
  IOrderFindManyParams
} from './entity-layer/interfaces/order-read.interfaces';
import {
  IOrderCreateOneParams,
  IOrderUpdateOneParams,
  IOrderUpsertOneParams
} from './entity-layer/interfaces/order-write.interfaces';
import { OrderReadService } from './entity-layer/order-read.service';
import { OrderWasteService } from './entity-layer/order-waste.service';
import { OrderWriteService } from './entity-layer/order-write.service';

@Injectable()
export class OrderExternalService {
	constructor(
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService,
		private readonly orderWasteService: OrderWasteService,
		private readonly orderBasketService: OrderBasketService,
		private readonly orderConfirmedService: OrderConfirmedService
	) {}

	async findOne(orderCode: string, query?: IOrderQueryOne) {
		return this.orderReadService.findOne(
			{
				code: orderCode,
			},
			query
		);
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	) {
		return this.orderReadService.findAndCountAll(params, query);
	}

	async findFirst(params: IOrderFindFirstParams, query?: IOrderQueryOne) {
		return this.orderReadService.findFirst(params, query);
	}

	async create(params: IOrderCreateOneParams) {
		return this.orderWriteService.createOne(params);
	}

	async updateOne(orderCode: string, params: IOrderUpdateOneParams) {
		return this.orderWriteService.updateOne(orderCode, params);
	}

	async upsertOne(params: IOrderUpsertOneParams) {
		return this.orderWriteService.upsertOne(params);
	}

	async delete(orderCode: string, force?: boolean) {
		return this.orderWasteService.delete(orderCode, force);
	}

	async restore(orderCode: string) {
		return this.orderWasteService.restore(orderCode);
	}

	async confirm(orderCode: string, payload: { email: string }) {
		return this.orderBasketService.confirm(orderCode, payload);
	}

	async getReceipt(orderCode: string) {
		return this.orderConfirmedService.getReceipt(orderCode);
	}
}
