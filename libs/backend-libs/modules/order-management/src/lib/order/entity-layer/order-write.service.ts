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
	ICreateOrder,
	IOrderCreateParams,
	IOrderUpsertParams,
	IUpdateOrder,
	IUpsertOrder,
	IOrderUpdateParams,
	IOrderUpdateManyParams,
	IUpdateManyOrder,
} from './interfaces/order-write.interfaces';
import { OrderReadService } from './order-read.service';
import { OrderWasteService } from './order-waste.service';

@Injectable()
export class OrderWriteService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order,
		private readonly orderReadService: OrderReadService,
		private readonly orderWasteService: OrderWasteService
	) {}

	async createOne(
		params: IOrderCreateParams,
		createOrder: ICreateOrder
	): Promise<Order> {
		return this.orderRepository.create({
			AccountCode: params.accountCode,
			messageForOwner: createOrder.messageForOwner,
			confirmed: createOrder.confirmed,
		});
	}

	// POST/orders/basketID/confirm
	// { accountEmail }
	// async confirm(params: { code: string }) {
	// 	return this.orderRepository;
	// }

	async createMany(
		params: IOrderCreateParams,
		createOrders: ICreateOrder[]
	): Promise<Order[]> {
		let orders: Order[] = [];
		createOrders.forEach(async (createOrder) => {
			const order = await this.orderRepository.create({
				AccountCode: params.accountCode,
				messageForOwner: createOrder.messageForOwner,
				confirmed: createOrder.confirmed,
			});
			orders.push(order);
		});
		return orders;
	}

	async upsertOne(
		params: IOrderUpsertParams,
		upsertOrder: IUpsertOrder
	): Promise<Order> {
		const { '0': instance, '1': created } =
			await this.orderRepository.upsert({
				AccountCode: params.accountCode,
				messageForOwner: upsertOrder.messageForOwner,
				confirmed: upsertOrder.confirmed,
			});
		return instance;
	}

	async updateOne(
		params: IOrderUpdateParams,
		updateOrder: IUpdateOrder
	): Promise<Order> {
		await this.orderRepository.update(
			{
				messageForOwner: updateOrder.messageForOwner,
				confirmed: updateOrder.confirmed,
			},
			{
				where: {
					code: params.orderCode,
					AccountCode: params.accountCode,
				},
			}
		);
		const order = await this.orderReadService.findOne({
			accountCode: params.accountCode,
			orderCode: params.orderCode,
		});
		if (order) return order;
		else throw new Error('Order with the provided code was not found.');
	}

	async updateMany(
		params: IOrderUpdateManyParams,
		updateOrders: IUpdateManyOrder[]
	): Promise<Order[]> {
		let orders: Order[] = [];
		updateOrders.forEach(async (updateOrder, index) => {
			await this.orderRepository.update(
				{
					messageForOwner: updateOrder.messageForOwner,
					confirmed: updateOrder.confirmed,
				},
				{
					where: {
						code: updateOrder.orderCode,
						AccountCode: params.accountCode,
					},
				}
			);
			const order = await this.orderReadService.findOne({
				accountCode: params.accountCode,
				orderCode: updateOrder.orderCode,
			});
			if (order) orders.push(order);
			else
				throw new Error(
					`Code ${updateOrder.orderCode} is not associated with any existing records.`
				);
		});
		return orders;
	}
}
