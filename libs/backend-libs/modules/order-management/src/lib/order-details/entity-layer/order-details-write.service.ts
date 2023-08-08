import { Inject, Injectable } from '@nestjs/common';
import { OrderDetails } from '@backend-demo/backend-libs/tables';
import { OrderDetailsReadService } from './order-details-read.service';
import {
	ICreateOrderDetails,
	IOrderDetailsCreateParams,
	IOrderDetailsUpdateParams,
	IOrderDetailsUpsertParams,
	IUpsertOrderDetails,
} from './interfaces/order-details-write.interfaces';
import { IOrderDetailsUpdate } from '../dto/interfaces/update-order-details.interface';
import { OrderDetailsManagementQueryService } from '../../order-details-management-query.service';

@Injectable()
export class OrderDetailsWriteService {
	constructor(
		@Inject('ORDER_DETAILS_REPOSITORY')
		private orderDetailsRepository: typeof OrderDetails,
		private orderDetailsReadService: OrderDetailsReadService,
		private readonly orderDetailsManagementQueryService: OrderDetailsManagementQueryService
	) {}

	private async calculateTotalPrice(
		productCode: string,
		quantity: number
	): Promise<number> {
		const accountCode =
			await this.orderDetailsManagementQueryService.queryFindAccountCodeByProduct(
				productCode
			);

		const product =
			await this.orderDetailsManagementQueryService.queryFindOneAccountProduct(
				{
					productCode: productCode,
					accountCode: accountCode,
				}
			);

		if (!product) {
			throw new Error('Product not found.');
		}

		return product.price * quantity;
	}

	async createOne(
		params: IOrderDetailsCreateParams,
		createOrderDetails: ICreateOrderDetails
	): Promise<OrderDetails> {
		const { quantity, canBeDeliveredSeparately } = createOrderDetails;
		const totalPrice = await this.calculateTotalPrice(
			params.productCode,
			quantity
		);
		const orderDetails = await this.orderDetailsRepository.create({
			OrderCode: params.orderCode,
			ProductCode: params.productCode,
			quantity,
			totalPrice,
			canBeDeliveredSeparately,
		});
		return orderDetails.save();
	}

	async createMany(
		params: IOrderDetailsCreateParams,
		createOrderDetails: ICreateOrderDetails[]
	): Promise<OrderDetails[]> {
		const orderDetails = await Promise.all(
			createOrderDetails.map(async (orderDetailsParams) => {
				const orderDetail = await this.orderDetailsRepository.create({
					OrderCode: params.orderCode,
					ProductCode: params.productCode,
					quantity: orderDetailsParams.quantity,
					canBeDeliveredSeparately:
						orderDetailsParams.canBeDeliveredSeparately,
				});
				return orderDetail.save();
			})
		);
		return orderDetails;
	}

	async upsertOne(
		params: IOrderDetailsUpsertParams,
		upsertOrderDetails: IUpsertOrderDetails
	): Promise<OrderDetails> {
		const { orderCode, productCode } = params;
		const { quantity, canBeDeliveredSeparately } = upsertOrderDetails;

		if (!quantity) {
			throw new Error(
				'Quantity and canBeDeliveredSeparately must be defined'
			);
		}

		const [orderDetails] = await this.orderDetailsRepository.upsert({
			OrderCode: orderCode,
			ProductCode: productCode,
			quantity,
			canBeDeliveredSeparately,
		});
		return orderDetails;
	}

	async updateOne(
		params: IOrderDetailsUpdateParams,
		updateOrderDetails: IOrderDetailsUpdate
	): Promise<OrderDetails> {
		const { orderDetailsCode, orderCode } = params;
		const existingOrderDetails = await this.orderDetailsReadService.findOne(
			{
				orderDetailsCode,
				orderCode,
			}
		);
		if (!existingOrderDetails) {
			throw new Error(
				`Order Details with code ${params.orderDetailsCode} does not exist.`
			);
		}
		const updatedOrderDetails = await existingOrderDetails.update(
			updateOrderDetails
		);
		return updatedOrderDetails;
	}
}
