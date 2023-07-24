/**
 * inject OrderReadService v constructoru
 *
 * transaction -- na konci (možná bude libka transactionService)
 * createOne
 * createMany
 * upsertOne
 * updateOne
 * updateMany
 */

import { Order } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	IOrderCreateOneParams,
	IOrderUpdateManyParams,
	IOrderUpsertOneParams,
} from './interfaces/order-write.interfaces';
import { OrderReadService } from './order-read.service';

@Injectable({})
export class OrderWriteService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order,
		private orderReadService: OrderReadService
	) {}

	async createOne(params: IOrderCreateOneParams): Promise<Order> {
		return this.orderRepository.create({
			AccountCode: params.AccountCode,
			messageForOwner: params.messageForOwner,
		});
	}

	async createMany(params: IOrderCreateOneParams[]): Promise<Order[]> {
		let orders: Order[] = [];
		params.forEach(async (param) => {
			const order = await this.orderRepository.create({
				AccountCode: param.AccountCode,
				messageForOwner: param.messageForOwner,
			});
			orders.push(order);
		});
		return orders;
	}

	async upsertOne(params: IOrderUpsertOneParams): Promise<Order> {
		const { '0': instance, '1': created } =
			await this.orderRepository.upsert({
				AccountCode: params.AccountCode,
				messageForOwner: params.messageForOwner,
			});
		return instance;
	}

	async updateOne(
		accountCode: string,
		orderCode: string,
		params: IOrderUpsertOneParams
	): Promise<Order> {
		await this.orderRepository.update(
			{
				AccountCode: params.AccountCode,
				messageForOwner: params.messageForOwner,
			},
			{
				where: { code: orderCode },
			}
		);
		const order = await this.orderReadService.findOne({
			code: orderCode,
			AccountCode: accountCode,
		});
		if (order) return order;
		else throw new Error('Order with the provided code was not found.');
	}

	async updateMany(params: IOrderUpdateManyParams[]): Promise<Order[]> {
		let orders: Order[] = [];
		params.forEach(async (param) => {
			const { '0': affectedNumber } = await this.orderRepository.update(
				{
					AccountCode: param.AccountCode,
					messageForOwner: param.messageForOwner,
				},
				{
					where: { code: param.code },
				}
			);
			const order = await this.orderReadService.findOne({
				code: param.code,
				AccountCode: param.AccountCode,
			});
			if (order) orders.push(order);
			else
				throw new Error(
					`Code ${param.code} is not associated with any existing records.`
				);
		});
		return orders;
	}
}
