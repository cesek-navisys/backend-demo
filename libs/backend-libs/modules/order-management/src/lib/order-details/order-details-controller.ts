import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDetailsExternalService } from './order-details-external.service';
import {
	ACCOUNT_CODE_API_PARAM,
	ORDER_CODE_API_PARAM,
	ORDER_DETAILS_ALIAS,
	ORDER_DETAILS_CODE_ALIAS,
	ORDER_DETAILS_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { orderDetailsManagementRoutes } from './order-details-management.routes';
import { OrderDetailsQueryDto, ViewOrderDetailsMapperDto } from './dto';
import { plainToInstance } from 'class-transformer';

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
}
