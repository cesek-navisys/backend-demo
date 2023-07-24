/**
 * inject OrderReadService v constructoru
 *
 * delete
 * restore
 */

import { Order } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import { OrderReadService } from './order-read.service';
import { IOrderRestoreParams } from './interfaces/order-waste.interfaces';

@Injectable()
export class OrderWasteService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order,
		private orderReadService: OrderReadService
	) {}

	async delete(
		accountCode: string,
		orderCode: string,
		force = false
	): Promise<Order> {
		await this.orderRepository.destroy({
			where: { code: orderCode },
			force,
		});
		const order = await this.orderReadService.findOne({
			code: orderCode,
			AccountCode: accountCode,
		});
		if (order) return order;
		else
			throw new Error(
				`Provided code: ${orderCode} is not associated with any records in the database`
			);
	}

	async restore(
		accountCode: string,
		orderCode: string,
		params?: IOrderRestoreParams
	): Promise<Order | Order[]> {
		await this.orderRepository.restore({
			where: {
				code: orderCode,
				AccountCode: params?.AccountCode,
				messageForOwner: params?.messageForOwner,
			},
		});

		const order = await this.orderReadService.findOne({
			code: orderCode,
			AccountCode: accountCode,
		});
		if (order) return order;
		else
			throw new Error(
				'No records with the provided params were found to be restored'
			);
	}
}
