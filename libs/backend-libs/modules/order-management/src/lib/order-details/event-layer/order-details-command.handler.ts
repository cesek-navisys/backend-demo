import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDetailsCommand } from '@backend-demo/backend-libs/commands';
import { OrderDetailsWriteService } from '../entity-layer/order-details-write.service';
import { OrderReadService } from '../../order/entity-layer/order-read.service';
import { OrderWriteService } from '../../order/entity-layer/order-write.service';
import { Order } from '@backend-demo/backend-libs/tables';
import { OrderDetailsReadService } from '../entity-layer/order-details-read.service';

@CommandHandler(CreateOrderDetailsCommand)
export class CommandCreateOrderDetailsHandler
	implements ICommandHandler<CreateOrderDetailsCommand>
{
	constructor(
		private readonly orderDetailsWriteService: OrderDetailsWriteService,
		private readonly orderDetailsReadService: OrderDetailsReadService,
		private readonly orderReadService: OrderReadService,
		private readonly orderWriteService: OrderWriteService
	) {}
	async execute(query: CreateOrderDetailsCommand) {
		const { params } = query;
		const { accountCode, productCode, quantity } = params;
		let order: Order;
		const unconfirmedOrder = await this.orderReadService.findFirst(
			{
				accountCode,
			},
			{
				confirmed: false,
			}
		);
		if (unconfirmedOrder) order = unconfirmedOrder;
		else {
			const newOrder = await this.orderWriteService.createOne(
				{
					accountCode,
				},
				{
					confirmed: false,
				}
			);
			order = newOrder;
		}
		const productsOrderDetails =
			await this.orderDetailsReadService.findFirst({
				orderCode: order.code,
				productCode,
			});
		if (productsOrderDetails) {
			const updatedOrderDetails =
				await this.orderDetailsWriteService.updateOne(
					{
						orderCode: order.code,
						orderDetailsCode: productsOrderDetails.code,
					},
					{
						quantity: +productsOrderDetails.quantity + +quantity,
					}
				);
			return updatedOrderDetails;
		} else {
			const newOrderDetails =
				await this.orderDetailsWriteService.createOne(
					{
						accountCode,
						orderCode: order.code,
						productCode,
					},
					{
						canBeDeliveredSeparately: true,
						quantity,
					}
				);
			return newOrderDetails;
		}
	}
}
