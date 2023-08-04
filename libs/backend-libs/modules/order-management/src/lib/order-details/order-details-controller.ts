import {
	ACCOUNT_CODE_API_PARAM,
	ORDER_CODE_API_PARAM,
	ORDER_DETAILS_ALIAS,
	ORDER_DETAILS_CODE_API_PARAM,
	PRODUCT_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
	CreateOrderDetailsDto,
	OrderDetailsQueryDto,
	UpdateOrderDetailDto,
	ViewOrderDetailsMapperDto,
} from './dto';
import { OrderDetailsExternalService } from './order-details-external.service';
import { ViewProductMapperDto } from '@backend-demo/backend-libs/modules/product-management';
import { orderDetailsManagementRoutes } from './order-details-management.routes';

@ApiTags(ORDER_DETAILS_ALIAS)
@Controller(orderDetailsManagementRoutes.orderDetails)
export class OrderDetailsController {
	constructor(
		private readonly orderDetailsExternalService: OrderDetailsExternalService
	) {}

	@ApiOperation({
		summary: 'Get single Order Details',
	})
	@ApiResponse({ type: ViewOrderDetailsMapperDto })
	@Get(`:${ORDER_DETAILS_CODE_API_PARAM}`)
	async findOne(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Param(ORDER_DETAILS_CODE_API_PARAM) orderDetailsCode: string,
		@Query() query?: OrderDetailsQueryDto
	) {
		const result = this.orderDetailsExternalService.findOne(
			{ accountCode, orderCode, orderDetailsCode },
			query
		);
		return plainToInstance(ViewOrderDetailsMapperDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Get all Order Details',
	})
	@ApiResponse({
		type: ViewOrderDetailsMapperDto,
		isArray: true,
	})
	@Get()
	async findAll(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Query() query?: OrderDetailsQueryDto
	) {
		const result = this.orderDetailsExternalService.findAll(
			{ accountCode, orderCode },
			query
		);
		return plainToInstance(ViewOrderDetailsMapperDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Create Order Details',
	})
	@ApiResponse({ type: ViewProductMapperDto })
	@Post(`:${PRODUCT_CODE_API_PARAM}`)
	async create(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Param(PRODUCT_CODE_API_PARAM) productCode: string,
		@Body() createOrderDetailsDto: CreateOrderDetailsDto
	) {
		const result = this.orderDetailsExternalService.create(
			{ accountCode, orderCode, productCode },
			createOrderDetailsDto
		);
		return plainToInstance(ViewOrderDetailsMapperDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Update Order Details',
	})
	@ApiResponse({ type: ViewOrderDetailsMapperDto })
	@Put(`:${ORDER_DETAILS_CODE_API_PARAM}`)
	async update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Param(ORDER_DETAILS_CODE_API_PARAM) orderDetailsCode: string,
		@Body() updateOrderDetails: UpdateOrderDetailDto
	) {
		const result = this.orderDetailsExternalService.update(
			{ accountCode, orderCode, orderDetailsCode },
			updateOrderDetails
		);
		return plainToInstance(ViewOrderDetailsMapperDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Delete Order Details',
	})
	@Delete(`:${ORDER_DETAILS_CODE_API_PARAM}`)
	async delete(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(ORDER_CODE_API_PARAM) orderCode: string,
		@Param(ORDER_DETAILS_CODE_API_PARAM) orderDetailsCode: string
	) {
		return this.orderDetailsExternalService.delete({
			accountCode,
			orderCode,
			orderDetailsCode,
		});
	}
}
