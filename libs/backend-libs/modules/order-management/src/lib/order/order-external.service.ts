/**
 * je totéž, co controller - tzn. bude mít stejné metody i parametry
 * jako parametry bude používat interfaces
 *
 * findOne(accountCode: string, orderCode: string, query?: IOrderQueryOne)
 *
 */

import { IOrderConfirmParams } from './domain-layer/interfaces/order-basket.interface';
import { IOrderCreate, IOrderQueryOne } from './dto/interfaces';
import { Injectable } from '@nestjs/common';
import { OrderBasketService } from './domain-layer/order-basket.service';
import { OrderConfirmedService } from './domain-layer/order-confirmed.service';
import {
	IOrderFindAndCountManyQuery,
	IOrderFindManyParams,
	IOrderFindOneParams,
} from './entity-layer/interfaces/order-read.interfaces';
import {
	IOrderDeleteParams,
	IOrderRestoreParams,
} from './entity-layer/interfaces/order-waste.interfaces';
import {
	IOrderCreateParams,
	IOrderUpdateParams,
	IUpdateOrder,
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

	/**
	 *
	 * @param params url parameters from controller such as those in get request url BEFORE question mark
	 * @param query url parameters AFTER question mark
	 * @returns database instance of the model
	 */
	async findOne(params: IOrderFindOneParams, query?: IOrderQueryOne) {
		const { orderCode, accountCode } = params;
		return this.orderReadService.findOne(
			{
				orderCode,
				accountCode,
			},
			{ ...query }
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
	async create(params: IOrderCreateParams, createOrder: IOrderCreate) {
		return this.orderWriteService.createOne(params, createOrder);
	}

	async update(params: IOrderUpdateParams, updateOrder: IUpdateOrder) {
		return this.orderWriteService.updateOne(params, updateOrder);
	}

	async delete(params: IOrderDeleteParams) {
		return this.orderWasteService.delete(params);
	}

	async restore(params: IOrderRestoreParams) {
		return this.orderWasteService.restore(params);
	}

	async confirm(params: IOrderConfirmParams) {
		return this.orderBasketService.confirm(params);
	}

	async getReceipt(params: IOrderFindOneParams) {
		return this.orderConfirmedService.getReceipt(params);
	}
}
