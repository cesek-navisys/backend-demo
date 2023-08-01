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
import {
	ACCOUNT_CODE_API_PARAM,
	ORDERS_ALIAS,
	ORDER_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
import { orderManagementRoutes } from './order-management.routes';
import { plainToClass } from 'class-transformer';
import {
	ApiCreatedResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags(ORDERS_ALIAS)
@Controller(orderManagementRoutes.order)
export class OrderController {
	constructor(private readonly orderExternalService: OrderExternalService) {}

	@ApiOperation({
		summary: 'Get order by code',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Get(`:${ORDER_CODE_API_PARAM}`)
	findOne(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Query() query?: OrderQueryDto
	) {
		const result = this.orderExternalService.findOne(
			{ accountCode, orderCode },
			query
		);
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Get all orders',
	})
	@ApiResponse({ type: ViewOrderDto, isArray: true })
	@Get()
	findAll(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Query() query: OrderQueryDto
	) {
		const result = this.orderExternalService.findAndCountAll(
			{ accountCode },
			query
		);
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Create order',
	})
	@ApiCreatedResponse()
	@Post()
	create(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Body() createOrderDto: CreateOrderDto
	) {
		const result = this.orderExternalService.create(
			{ accountCode },
			createOrderDto
		);
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Update order',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Put(`:${ORDER_CODE_API_PARAM}`)
	update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Body() updateOrderDto: UpdateOrderDto
	) {
		const result = this.orderExternalService.update(
			{ accountCode, orderCode },
			updateOrderDto
		);
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Remove order',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Delete(`:${ORDER_CODE_API_PARAM}`)
	remove(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string
	) {
		const result = this.orderExternalService.delete({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Restore order',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Put(orderManagementRoutes.orderRestore)
	restore(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string
	) {
		const result = this.orderExternalService.restore({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Confirm order',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Put(orderManagementRoutes.orderConfirm)
	confirm(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string
	) {
		const result = this.orderExternalService.confirm({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Get order details for order',
	})
	@ApiResponse({ type: ViewOrderDto })
	@Get(orderManagementRoutes.orderGetReceipt)
	getReceipt(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string
	) {
		const result = this.orderExternalService.getReceipt({
			accountCode,
			orderCode,
		});
		return plainToClass(ViewOrderDto, result, {
			excludeExtraneousValues: true,
		});
	}
}
