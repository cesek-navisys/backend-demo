/**
 * controller bude mít stejné metody jako external-service, ale bude používat dto classes
 */

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { OrderExternalService } from './order-external.service';
import { CreateOrderDto, OrderQueryDto, UpdateOrderDto } from './dto';
import { ORDER_CODE_API_PARAM } from '@backend-demo/shared/constants';
import { orderManagementRoutes } from './order-management.routes';

@Controller(orderManagementRoutes.order)
export class OrderController {
	constructor(private readonly orderExternalService: OrderExternalService) {}

	@Get(`:${ORDER_CODE_API_PARAM}`)
	findOne(
		@Param() accountCode: string,
		@Param() orderCode: string,
		@Query() query?: OrderQueryDto
	) {
		return this.orderExternalService.findOne(
			{ accountCode, orderCode },
			query
		);
	}

	@Get()
	findAll(@Param() accountCode: string, @Query() query: OrderQueryDto) {
		return this.orderExternalService.findAndCountAll(
			{ accountCode },
			query
		);
	}

	@Post()
	create(
		@Param() accountCode: string,
		@Body() createOrderDto: CreateOrderDto
	) {
		return this.orderExternalService.create(
			{ accountCode },
			createOrderDto
		);
	}

	@Put(`:${ORDER_CODE_API_PARAM}`)
	update(
		@Param() accountCode: string,
		@Param() orderCode: string,
		@Body() updateOrderDto: UpdateOrderDto
	) {
		return this.orderExternalService.update(
			{ accountCode, orderCode },
			updateOrderDto
		);
	}

	@Delete(`:${ORDER_CODE_API_PARAM}`)
	// TODO: Implement 'force'
	remove(@Param() accountCode: string, @Param() orderCode: string) {
		return this.orderExternalService.delete({ accountCode, orderCode });
	}

	@Put(`${orderManagementRoutes.orderRestore}:${ORDER_CODE_API_PARAM}`)
	restore(@Param() accountCode: string, @Param() orderCode: string) {
		return this.orderExternalService.restore({ accountCode, orderCode });
	}

	@Put(`${orderManagementRoutes.orderConfirm}/:${ORDER_CODE_API_PARAM}`)
	confirm(@Param() accountCode: string, @Param() orderCode: string) {
		return this.orderExternalService.confirm({ accountCode, orderCode });
	}

	@Get(`${orderManagementRoutes.orderGetReceipt}/:${ORDER_CODE_API_PARAM}`)
	getReceipt(@Param() accountCode: string, @Param() orderCode: string) {
		return this.orderExternalService.getReceipt({ accountCode, orderCode });
	}
}
