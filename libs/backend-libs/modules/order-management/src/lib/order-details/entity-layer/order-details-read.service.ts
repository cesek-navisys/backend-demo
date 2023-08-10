import { OrderDetails, Product } from '@backend-demo/backend-libs/tables';
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
		if (query?.includeProduct) {
			return this.orderDetailsRepository.scope(['WITH_PRODUCT']).findOne({
				where: {
					code: params.orderDetailsCode,
					OrderCode: params.orderCode,
				},
			});
		}
		if (query?.includeOrder)
			return this.orderDetailsRepository.scope(['WITH_ORDER']).findOne({
				where: {
					code: params.orderDetailsCode,
					OrderCode: params.orderCode,
				},
			});
		return this.orderDetailsRepository.findOne({
			where: {
				code: params.orderDetailsCode,
				OrderCode: params.orderCode,
			},
		});
	}

	async findFirst(
		params: IOrderDetailsFindFirstParams,
		query?: IOrderDetailsFindFirstQuery
	): Promise<OrderDetails | null> {
		return this.orderDetailsRepository.findOne({
			where: {
				OrderCode: params.orderCode,
				ProductCode: params.productCode,
			},
		});
	}

	async findAll(
		params: IOrderDetailsFindManyParams,
		query?: IOrderDetailsFindManyQuery
	): Promise<OrderDetails[] | null> {
		const include = [];
		if (query?.includeProduct) {
			include.push({ model: Product });
		}
		return this.orderDetailsRepository.findAll({
			where: {
				OrderCode: params.orderCode,
			},
			include: include,
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
