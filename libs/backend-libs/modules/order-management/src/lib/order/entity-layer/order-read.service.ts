/**
 * orderRepository from orderProvider
 *
 * findOne(params: IOrderFindOneParams, query?: IOrderFindOneQuery)
 * findFirst
 * findAll
 * findAndCountAll
 * count
 */

import { Order } from '@backend-demo/backend-libs/tables';
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

@Injectable()
export class OrderReadService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order
	) {}

	async findOne(
		params: IOrderFindOneParams,
		query?: IOrderFindOneQuery
	): Promise<Order | null> {
		if (query?.filterWithOrderDetails) {
			const order = await this.orderRepository
				.scope(['ONLY_WHERE_ORDER_DETAILS_EXIST', 'WITH_ORDER_DETAILS'])
				.findOne({
					where: {
						code: params.orderCode,
						AccountCode: params.accountCode,
					},
					//logging: console.debug,
				});
			console.log(order);
			console.log(order?.toJSON());
			return order;
		}
		if (query?.totalPrice) {
			const order = await this.orderRepository
				.scope({
					method: [
						'onlyWhenProductPriceHigherThan',
						query.totalPrice,
					],
				})
				.findOne<Order>({
					where: {
						code: params.orderCode,
						AccountCode: params.accountCode,
					},
					logging: console.debug,
				});
			return order;
		}
		if (query?.includeAccount) {
			const order = await this.orderRepository
				.scope('WITH_ACCOUNT')
				.findOne({
					where: {
						code: params.orderCode,
						AccountCode: params.accountCode,
					},
				});
			return order;
		}
		const order = await this.orderRepository.findOne<Order>({
			where: { code: params.orderCode, AccountCode: params.accountCode },
			logging: console.debug,
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
		});
		return order;
	}

	async findAll(
		params: IOrderFindManyParams,
		query?: IOrderFindManyQuery
	): Promise<Order[] | null> {
		return this.orderRepository.findAll<Order>({});
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
			limit: query?.limit ?? 10,
			offset: query?.page ? (query.page - 1) * (query.limit ?? 10) : 0,
		});
		if (query?.includeCount) return allOrders;
		else return allOrders.rows;
	}
}
