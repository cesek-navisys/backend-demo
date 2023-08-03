import { Injectable } from '@nestjs/common';
import { OrderDetailsReadService } from './entity-layer/order-details-read.service';
import { OrderDetailsWasteService } from './entity-layer/order-details-waste.service';
import { OrderDetailsWriteService } from './entity-layer/order-details-write.service';
import {
	IOrderDetailsFindManyParams,
	IOrderDetailsFindOneParams,
} from './entity-layer/interfaces/order-details-read.interfaces';
import {
	IOrderDetailsQueryMany,
	IOrderDetailsQueryOne,
} from './dto/interfaces/query-order-details.interface';
import {
	IOrderDetailsCreateParams,
	IOrderDetailsUpdateParams,
	IUpdateOrderDetails,
} from './entity-layer/interfaces/order-details-write.interfaces';
import { IOrderDetailsCreate } from './dto/interfaces/create-order-details.interface';
import { IOrderDetailsDeleteParams } from './entity-layer/interfaces/order-details-waste.interfaces';
import { OrderReadService } from '../order/entity-layer/order-read.service';

@Injectable()
export class OrderDetailsExternalService {
	constructor(
		private readonly orderDetailsReadService: OrderDetailsReadService,
		private readonly orderDetailsWasteService: OrderDetailsWasteService,
		private readonly orderDetailsWriteService: OrderDetailsWriteService,
		private readonly orderReadService: OrderReadService
	) {}

	async findOne(
		params: {
			orderCode: string;
			orderDetailsCode: string;
			accountCode: string;
		},
		query?: IOrderDetailsQueryOne
	) {
		const { orderCode, orderDetailsCode, accountCode } = params;
		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		if (!order) {
			throw new Error(`Order with code ${orderCode} was not found`);
		}
		return this.orderDetailsReadService.findOne(
			{
				orderCode: order.code,
				orderDetailsCode,
			},
			{ ...query }
		);
	}

	async findAll(
		params: IOrderDetailsFindManyParams,
		query?: IOrderDetailsQueryMany
	) {
		return this.orderDetailsReadService.findAll(params, query);
	}

	async create(
		params: IOrderDetailsCreateParams,
		createOrderDetails: IOrderDetailsCreate
	) {
		return this.orderDetailsWriteService.createOne(
			params,
			createOrderDetails
		);
	}

	async update(
		params: IOrderDetailsUpdateParams,
		updateOrderDetails: IUpdateOrderDetails
	) {
		return this.orderDetailsWriteService.updateOne(
			params,
			updateOrderDetails
		);
	}

	async delete(params: IOrderDetailsDeleteParams) {
		return this.orderDetailsWasteService.delete(params);
	}
}
