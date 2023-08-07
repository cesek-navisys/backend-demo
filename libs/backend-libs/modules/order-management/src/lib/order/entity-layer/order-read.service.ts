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
			where: { code: params.orderCode, AccountCode: params.accountCode },
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
				AccountCode: params.accountCode,
				confirmed: query?.confirmed,
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
			include: this.queries(query),
		});
	}

	async count(params: IOrderFindManyParams): Promise<number> {
		return this.orderRepository.count<Order>({
			where: {
				AccountCode: params.accountCode,
			},
		});
	}

	async findAndCountAll(
		params: IOrderFindManyParams,
		query?: IOrderFindAndCountManyQuery
	): Promise<{ rows: Order[] | null; count: number } | Order[]> {
		const allOrders = await this.orderRepository.findAndCountAll<Order>({
			where: { AccountCode: params.accountCode },
			include: this.queries(query),
			limit: query?.limit ?? 10,
			offset: query?.page ? (query.page - 1) * (query.limit ?? 10) : 0,
		});
		if (query?.includeCount) return allOrders;
		else return allOrders.rows;
	}
}
