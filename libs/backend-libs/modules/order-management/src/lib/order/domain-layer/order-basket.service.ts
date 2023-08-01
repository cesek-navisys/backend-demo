import { Injectable } from '@nestjs/common';
import { OrderReadService } from '../entity-layer/order-read.service';
import { OrderWriteService } from '../entity-layer/order-write.service';
import { IOrderConfirmParams } from './interfaces/order-basket.interface';

@Injectable()
export class OrderBasketService {
	constructor(
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService
	) {}

	async confirm(params: IOrderConfirmParams) {
		const orderBasket = await this.orderReadService.findOne({
			orderCode: params.orderCode,
			accountCode: params.accountCode,
		});
		if (!orderBasket) throw new Error('Order was not found');
		if (orderBasket.confirmed)
			throw new Error('Order was already confirmed');
		const confirmedOrder = await this.orderWriteService.updateOne(
			{
				accountCode: orderBasket.AccountCode,
				orderCode: orderBasket.code,
			},
			{
				confirmed: true,
			}
		);
		return confirmedOrder;
	}
}
