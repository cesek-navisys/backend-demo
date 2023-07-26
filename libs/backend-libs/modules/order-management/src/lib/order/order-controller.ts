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

@Controller('orders')
export class OrderController {
	constructor(private readonly orderExternalService: OrderExternalService) {}

	@Get(':code')
	findOne(@Param() code: string, @Query() query?: OrderQueryDto) {
		return this.orderExternalService.findOne(code, query);
	}

	@Get()
	findAndCountAll(
		@Body() params: ViewOrderMapperDto,
		@Query() query: OrderQueryDto
	) {
		return this.orderExternalService.findAndCountAll(params, query);
	}

	@Get('first')
	findFirst(
		@Body() params: ViewOrderMapperDto,
		@Query() query: OrderQueryDto
	) {
		return this.orderExternalService.findFirst(params, query);
	}

	@Post()
	create(@Body() params: CreateOrderDto) {
		return this.orderExternalService.create(params);
	}

	@Put(':code')
	update(@Body() params: UpdateOrderDto, @Param() code: string) {
		return this.orderExternalService.updateOne(code, params);
	}

	@Delete(':code')
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
