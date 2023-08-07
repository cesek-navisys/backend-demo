import { ActivateAccountByCodeCommand } from '@backend-demo/backend-libs/commands';
import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { IOrderConfirmParams } from './interfaces/order-basket.interface';
import { OrderManagementQueryService } from '../../order-management-query.service';
import { OrderReadService } from '../entity-layer/order-read.service';
import { OrderWriteService } from '../entity-layer/order-write.service';

@Injectable()
export class OrderBasketService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly orderManagementQueryService: OrderManagementQueryService,
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService,
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

		let account = await this.orderManagementQueryService.queryAccountByCode(
			{
				accountCode: orderBasket.AccountCode,
			}
		);

		if (!account.isActive) {
			account = await this.commandBus.execute(
				new ActivateAccountByCodeCommand({ accountCode: account.code })
			);
		}

		return confirmedOrder;
	}
}
