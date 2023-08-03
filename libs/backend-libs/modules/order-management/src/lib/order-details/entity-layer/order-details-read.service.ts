import { OrderDetails } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	IOrderDetailsFindFirstParams,
	IOrderDetailsFindFirstQuery,
	IOrderDetailsFindManyParams,
	IOrderDetailsFindManyQuery,
	IOrderDetailsFindOneParams,
	IOrderDetailsFindOneQuery,
} from './interfaces/order-details-read.interfaces';
import { IOrderFindManyQuery } from '../../order/entity-layer/interfaces/order-read.interfaces';

@Injectable()
export class OrderDetailsReadService {
	constructor(
		@Inject('ORDER_DETAILS_REPOSITORY')
		private orderDetailsRepository: typeof OrderDetails
	) {}

	async findOne(
		params: IOrderDetailsFindOneParams,
		query?: IOrderDetailsFindOneQuery
	): Promise<OrderDetails | null> {
		const orderDetails = await this.orderDetailsRepository.findOne({
			where: {
				code: params.orderDetailsCode,
				OrderCode: params.orderCode,
			},
			include: { ...query },
		});
		return orderDetails;
	}

	async findFirst(
		params: IOrderDetailsFindFirstParams,
		query?: IOrderDetailsFindFirstQuery
	): Promise<OrderDetails | null> {
		return this.orderDetailsRepository.findOne({
			where: {
				code: params.orderDetailsCode,
				OrderCode: params.orderCode,
				...query,
			},
		});
	}

	async findAll(
		params: IOrderDetailsFindManyParams,
		query?: IOrderDetailsFindManyQuery
	): Promise<OrderDetails[] | null> {
		return this.orderDetailsRepository.findAll({
			where: {
				OrderCode: params.orderCode,
			},
			include: { ...query },
		});
	}

	async findAndCountAll(
		params: IOrderDetailsFindManyParams,
		query?: IOrderFindManyQuery
	): Promise<{ rows: OrderDetails[]; count: number }> {
		return this.orderDetailsRepository.findAndCountAll({
			where: { OrderCode: params.orderCode },
			limit: query?.limit,
		});
	}

	async count(params: IOrderDetailsFindManyParams): Promise<number> {
		return this.orderDetailsRepository.count({
			where: { OrderCode: params.orderCode },
		});
	}
}
