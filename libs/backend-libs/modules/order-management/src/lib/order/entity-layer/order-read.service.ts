/**
 * orderRepository from orderProvider
 *
 * findOne(params: IOrderFindOneParams, query?: IOrderFindOneQuery)
 * findFirst
 * findAll
 * findAndCountAll
 * count
 */

import {
	Account,
	Order,
	OrderDetails,
} from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	IOrderFindAndCountManyQuery,
	IOrderFindFirstParams,
	IOrderFindFirstQuery,
	IOrderFindManyParams,
	IOrderFindManyQuery,
	IOrderFindOneParams,
	IOrderFindOneQuery,
} from './interfaces/order-read.interfaces';
import { IOrderQueryOne } from '../dto/interfaces';

@Injectable()
export class OrderReadService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order
	) {}

	private queries(query: IOrderQueryOne | undefined) {
		const queries = [];
		if (query?.includeAccount) queries.push(Account);
		if (query?.includeOrderDetails) queries.push(OrderDetails);
		return queries;
	}

	async findOne(
		params: IOrderFindOneParams,
		query?: IOrderFindOneQuery
	): Promise<Order | null> {
		const order = await this.orderRepository.findOne<Order>({
			where: { code: params.code },
			include: this.queries(query),
		});
		return order;
	}

	async findFirst(
		params: IOrderFindFirstParams,
		query?: IOrderFindFirstQuery
	): Promise<Order | null> {
		const order = this.orderRepository.findOne<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: this.queries(query),
		});
		return order;
	}

	async findAll(
		params: IOrderFindManyParams,
		query?: IOrderFindManyQuery
	): Promise<Order[] | null> {
		return this.orderRepository.findAll<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: this.queries(query),
		});
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	): Promise<Order[] | null> {
		return this.orderRepository.findAll<Order>({
			where: {
				messageForOwner: params.messageForOwner,
				AccountCode: params.AccountCode,
			},
			include: this.queries(query),
			limit: query?.limit ?? 10,
			offset: query?.page ? (query.page - 1) * (query.limit ?? 10) : 0,
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
