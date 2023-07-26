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
	constructor(private readonly orderExternalService: OrderExternalService) { }

	@Get(`:${ORDER_CODE_API_PARAM}`)
	findOne(
		@Param() accountCode: string,
		@Param() code: string,
		@Query() query?: OrderQueryDto) {
		return this.orderExternalService.findOne(code, query);
	}

	@Get()
	findAll(
		@Param() accountCode: string,
		@Query() query: OrderQueryDto
	) {
		return this.orderExternalService.findAndCountAll({ AccountCode: accountCode }, query);
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
	remove(@Param() code: string) {
		return this.orderExternalService.delete(code);
	}

	@Put('restore/:code')
	restore(@Param() code: string) {
		return this.orderExternalService.restore(code);
	}

	@Put('confirm/:code')
	confirm(@Param() code: string, @Body() payload: { email: string }) {
		return this.orderExternalService.confirm(code, payload);
	}

	@Get('get-receipt/:code')
	getReceipt(@Param() code: string) {
		return this.orderExternalService.getReceipt(code);
	}
}
