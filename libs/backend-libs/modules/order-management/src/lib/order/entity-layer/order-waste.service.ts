/**
 * inject OrderReadService v constructoru
 *
 * delete
 * restore
 */

import { Order } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import { OrderReadService } from './order-read.service';
import {
	IOrderDeleteParams,
	IOrderRestoreParams,
} from './interfaces/order-waste.interfaces';

@Injectable()
export class OrderWasteService {
	constructor(
		@Inject('ORDER_REPOSITORY') private orderRepository: typeof Order,
		private orderReadService: OrderReadService
	) {}

	async delete(params: IOrderDeleteParams): Promise<Order> {
		const { orderCode, accountCode } = params;
		await this.orderRepository.destroy({
			where: {
				code: orderCode,
				AccountCode: accountCode,
			},
		});
		const order = await this.orderReadService.findOne({
			accountCode,
			orderCode,
		});
		if (order) return order;
		else
			throw new Error(
				`Provided code: ${orderCode} is not associated with any records in the database`
			);
	}

	async restore(params: IOrderRestoreParams): Promise<Order> {
		const { accountCode, orderCode } = params;
		await this.orderRepository.restore({
			where: { code: orderCode, AccountCode: accountCode },
		});

		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		if (order) return order;
		else
			throw new Error(
				'No records with the provided params were found to be restored'
			);
	}
}
