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
	ViewOrderDto,
} from './dto';
import { ORDER_CODE_API_PARAM } from '@backend-demo/shared/constants';
import { orderManagementRoutes } from './order-management.routes';
import { plainToClass } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';

@Controller(orderManagementRoutes.order)
export class OrderController {
	constructor(private readonly orderExternalService: OrderExternalService) {}

	@ApiResponse({ type: ViewOrderDto })
	@Get(`:${ORDER_CODE_API_PARAM}`)
	findOne(
		@Param() accountCode: string,
		@Param() orderCode: string,
		@Query() query?: OrderQueryDto
	) {
		const result = this.orderExternalService.findOne(
			{ accountCode, orderCode },
			query
		);
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto, isArray: true })
	@Get()
	findAll(@Param() accountCode: string, @Query() query: OrderQueryDto) {
		const result = this.orderExternalService.findAndCountAll(
			{ accountCode },
			query
		);
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Post()
	create(
		@Param() accountCode: string,
		@Body() createOrderDto: CreateOrderDto
	) {
		const result = this.orderExternalService.create(
			{ accountCode },
			createOrderDto
		);
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Put(`:${ORDER_CODE_API_PARAM}`)
	update(
		@Param() accountCode: string,
		@Param() orderCode: string,
		@Body() updateOrderDto: UpdateOrderDto
	) {
		const result = this.orderExternalService.update(
			{ accountCode, orderCode },
			updateOrderDto
		);
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Delete(`:${ORDER_CODE_API_PARAM}`)
	// TODO: Implement 'force'
	remove(@Param() accountCode: string, @Param() orderCode: string) {
		const result = this.orderExternalService.delete({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Put(orderManagementRoutes.orderRestore)
	restore(@Param() accountCode: string, @Param() orderCode: string) {
		const result = this.orderExternalService.restore({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Put(orderManagementRoutes.orderConfirm)
	confirm(@Param() accountCode: string, @Param() orderCode: string) {
		const result = this.orderExternalService.confirm({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result);
	}

	@ApiResponse({ type: ViewOrderDto })
	@Get(orderManagementRoutes.orderGetReceipt)
	getReceipt(@Param() accountCode: string, @Param() orderCode: string) {
		const result = this.orderExternalService.getReceipt({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result);
	}
}
