import { Injectable } from '@nestjs/common';
import { OrderReadService } from '../entity-layer/order-read.service';
import { OrderWriteService } from '../entity-layer/order-write.service';

@Injectable()
export class OrderBasketService {
	constructor(
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService // private readonly accountReadService: AccountReadService, // private readonly accountWriteService: AccountWriteService
	) {}

	async confirm(orderCode: string, payload: { email: string }) {
		const orderBasket = await this.orderReadService.findOne({
			code: orderCode,
		});
		if (!orderBasket) throw new Error('Order was not found');
		let account = await this.accountReadService.findByEmail({
			email: payload.email,
		});
		if (!account)
			account = await this.accountWriteService.createOne({
				email: payload.email,
			});
		const confirmedOrder = await this.orderWriteService.upsertOne({
			AccountCode: account.code,
			confirmed: true,
		});
		return confirmedOrder;
	}
}
