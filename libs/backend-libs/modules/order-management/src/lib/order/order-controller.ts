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
import {
	CreateOrderDto,
	OrderQueryDto,
	UpdateOrderDto,
	ViewOrderMapperDto,
} from './dto';
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
		return this.orderExternalService.findOne(orderCode, query);
	}

	@Get()
	findAll(@Param() accountCode: string, @Query() query: OrderQueryDto) {
		return this.orderExternalService.findAndCountAll(
			{ AccountCode: accountCode },
			query
		);
	}

	@Post()
	create(
		@Param() accountCode: string,
		@Body() createOrderDto: CreateOrderDto
	) {
		return this.orderExternalService.create(createOrderDto);
	}

	@Put(`:${ORDER_CODE_API_PARAM}`)
	update(@Param() orderCode: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderExternalService.updateOne(orderCode, updateOrderDto);
	}

	@Delete(`:${ORDER_CODE_API_PARAM}`)
	// TODO: Implement 'force'
	remove(@Param() orderCode: string) {
		return this.orderExternalService.delete(orderCode);
	}

	@Put(`restore/:${ORDER_CODE_API_PARAM}`)
	restore(@Param() orderCode: string) {
		return this.orderExternalService.restore(orderCode);
	}

	@Put(`confirm/:${ORDER_CODE_API_PARAM}`)
	confirm(@Param() orderCode: string, @Body() payload: { email: string }) {
		return this.orderExternalService.confirm(orderCode, payload);
	}

	@Get(`get-receipt/:${ORDER_CODE_API_PARAM}`)
	getReceipt(@Param() orderCode: string) {
		return this.orderExternalService.getReceipt(orderCode);
	}
}
