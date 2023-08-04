import { Inject, Injectable } from '@nestjs/common';
import { OrderDetails } from '@backend-demo/backend-libs/tables';
import { OrderDetailsReadService } from './order-details-read.service';
import {
	IOrderDetailsDeleteParams,
	IOrderDetailsRestoreParams,
} from './interfaces/order-details-waste.interfaces';

@Injectable()
export class OrderDetailsWasteService {
	constructor(
		@Inject('ORDER_DETAILS_REPOSITORY')
		private orderDetailsRepository: typeof OrderDetails,
		private orderDetailsReadService: OrderDetailsReadService
	) {}

	async delete(params: IOrderDetailsDeleteParams): Promise<void> {
		const { orderDetailsCode, orderCode } = params;
		const orderDetails = this.orderDetailsReadService.findOne({
			orderDetailsCode,
			orderCode,
		});

		if (!orderDetails) {
			throw new Error(
				`Order Details with code ${orderDetailsCode} do not exist.`
			);
		}
		this.orderDetailsRepository.destroy({
			where: { code: orderDetailsCode },
		});
	}

	async restore(params: IOrderDetailsRestoreParams): Promise<OrderDetails> {
		const { orderDetailsCode, orderCode } = params;
		this.orderDetailsRepository.restore({
			where: {
				code: orderDetailsCode,
				OrderCode: orderDetailsCode,
			},
		});

		const orderDetails = await this.orderDetailsReadService.findOne({
			orderDetailsCode,
			orderCode,
		});

		if (!orderDetails) {
			throw new Error(
				`Order Details with code ${orderDetailsCode} do not exist.`
			);
		}
		return orderDetails;
	}
}
