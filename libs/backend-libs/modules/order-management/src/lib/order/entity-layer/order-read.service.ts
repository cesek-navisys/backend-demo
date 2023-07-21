/**
 * orderRepository from orderProvider
 *
 * findOne(params: IOrderFindOneParams, query?: IOrderFindOneQuery)
 * findFirst
 * findAll
 * findAndCountAll
 * count
 */

import { Account, Order } from '@backend-demo/backend-libs/tables';
import { Inject } from '@nestjs/common';
import {
	IOrderFindAndCountManyQuery,
	IOrderFindFirstParams,
	IOrderFindFirstQuery,
	IOrderFindManyParams,
	IOrderFindManyQuery,
	IOrderFindOneParams,
	IOrderFindOneQuery,
} from './interfaces/order-read.interfaces';

export class OrderReadService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order
	) {}

	async findOne(
		params: IOrderFindOneParams,
		query?: IOrderFindOneQuery
	): Promise<Order | null> {
		return await this.orderRepository.findOne<Order>({
			where: { code: params.code },
			include: query?.includeAccount ? Account : undefined,
		});
	}

	async findFirst(
		params: IOrderFindFirstParams,
		query?: IOrderFindFirstQuery
	): Promise<Order | null> {
		const orders = await this.orderRepository.findAll<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: query?.includeAccount ? Account : undefined,
		});
		return orders[0];
	}

	async findAll(
		params: IOrderFindManyParams,
		query?: IOrderFindManyQuery
	): Promise<Order[] | null> {
		return await this.orderRepository.findAll<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: query?.includeAccount ? Account : undefined,
		});
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	): Promise<Order[] | null> {
		return await this.orderRepository.findAll<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: query?.includeAccount ? Account : undefined,
			limit: query?.limit ?? 10,
			offset: query?.page ? query.page - 1 : 0,
		});
	}

	async count(params: IOrderFindManyParams): Promise<number> {
		return this.orderRepository.count<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
		});
	}
}
