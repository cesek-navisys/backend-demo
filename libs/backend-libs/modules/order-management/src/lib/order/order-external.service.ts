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
import { IOrderQueryMany, IOrderQueryOne } from './dto/interfaces';
import {
	IOrderFindAndCountManyQuery,
	IOrderFindFirstParams,
	IOrderFindManyParams,
	IOrderFindManyQuery,
} from './entity-layer/interfaces/order-read.interfaces';
import {
	IOrderCreatePayload,
	IOrderUpdateManyParams,
	IOrderUpdateOneParams,
	IOrderUpsertOneParams,
} from './entity-layer/interfaces/order-write.interfaces';
import { IOrderRestoreParams } from './entity-layer/interfaces/order-waste.interfaces';
import { Injectable } from '@nestjs/common';
import { OrderBasketService } from './domain-layer/order-basket.service';
import { OrderConfirmedService } from './domain-layer/order-confirmed.service';

@Injectable()
export class OrderExternalService {
	constructor(
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService,
		private readonly orderWasteService: OrderWasteService,
		private readonly orderBasketService: OrderBasketService,
		private readonly orderConfirmedService: OrderConfirmedService
	) { }

	/**
	 * 
	 * @param params url parameters from controller such as those in get request url BEFORE question mark
	 * @param query url parameters AFTER question mark
	 * @returns database instance of the model
	 */
	async findOne(params: { accountCode: string, orderCode: string }, query?: IOrderQueryOne) {
		const { orderCode } = params;
		return this.orderReadService.findOne(
			{
				code: orderCode,
			},
			{ ...query, }
		);
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	) {
		return this.orderReadService.findAndCountAll(params, query);
	}

	/**
	 * 
	 * @param params url parameters from controller such as those in post request url BEFORE question mark (in write methods we typically do not use query at all)
	 * @param createOrder json body typically named by the DTO (in controller) or interface (in external-service) in pascalCase
	 * @returns database instance of the model
	 */
	async create(params: {}, createOrder: IOrderCreatePayload) {
		return this.orderWriteService.createOne(createOrder);
	}

	async update(orderCode: string, params: IOrderUpdateOneParams) {
		return this.orderWriteService.updateOne(orderCode, params);
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
