import { IOrderDetailsCreate } from './dto/interfaces/create-order-details.interface';
import { IUpdateOrderDetails } from './entity-layer/interfaces/order-details-write.interfaces';
import { Injectable } from '@nestjs/common';
import { OrderDetailsReadService } from './entity-layer/order-details-read.service';
import { OrderDetailsWasteService } from './entity-layer/order-details-waste.service';
import { OrderDetailsWriteService } from './entity-layer/order-details-write.service';
import { OrderReadService } from '../order/entity-layer/order-read.service';
import {
	IOrderDetailsQueryMany,
	IOrderDetailsQueryOne,
} from './dto/interfaces/query-order-details.interface';
import { OrderManagementQueryService } from '../order-management-query.service';

@Injectable()
export class OrderDetailsExternalService {
	constructor(
		private readonly orderDetailsReadService: OrderDetailsReadService,
		private readonly orderDetailsWasteService: OrderDetailsWasteService,
		private readonly orderDetailsWriteService: OrderDetailsWriteService,
		private readonly orderManagementQueryService: OrderManagementQueryService,
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
		params: {
			orderCode: string;
			accountCode: string;
		},
		query?: IOrderDetailsQueryMany
	) {
		const { orderCode, accountCode } = params;
		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		if (!order) {
			throw new Error(`Order with code ${orderCode} was not found`);
		}
		return this.orderDetailsReadService.findAll(
			{
				orderCode: order.code,
			},
			{ ...query }
		);
	}

	async create(
		params: {
			orderCode: string;
			productCode: string;
			accountCode: string;
		},
		createOrderDetails: IOrderDetailsCreate
	) {
		const { orderCode, productCode, accountCode } = params;
		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		const product =
			await this.orderManagementQueryService.queryProductByCode({
				accountCode,
				productCode,
			});

		if (!order) {
			throw new Error(`Order with code ${orderCode} was not found`);
		}
		if (!product) {
			throw new Error(`Product with code ${productCode} was not found`);
		}

		return this.orderDetailsWriteService.createOne(
			{
				orderCode: order.code,
				productCode: product.code,
			},
			createOrderDetails
		);
	}

	async update(
		params: {
			orderCode: string;
			orderDetailsCode: string;
			accountCode: string;
		},
		updateOrderDetails: IUpdateOrderDetails
	) {
		const { orderCode, orderDetailsCode, accountCode } = params;
		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		if (!order) {
			throw new Error(`Order with code ${orderCode} was not found`);
		}
		return this.orderDetailsWriteService.updateOne(
			{
				orderCode: order.code,
				orderDetailsCode,
			},
			updateOrderDetails
		);
	}

	async delete(params: {
		orderCode: string;
		orderDetailsCode: string;
		accountCode: string;
	}) {
		const { orderCode, orderDetailsCode, accountCode } = params;
		const order = await this.orderReadService.findOne({
			orderCode,
			accountCode,
		});
		if (!order) {
			throw new Error(`Order with code ${orderCode} was not found`);
		}
		return this.orderDetailsWasteService.delete({
			orderCode: order.code,
			orderDetailsCode,
		});
	}
}
