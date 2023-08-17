import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
	transformStringToBoolean,
	transformStringToNumber,
} from '@backend-demo/shared/transformers';
import {
	IOrderDetailsQueryMany,
	IOrderDetailsQueryOne,
} from './interfaces/query-order-details.interface';

export class OrderDetailsQueryDto
	implements IOrderDetailsQueryOne, IOrderDetailsQueryMany
{
	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeProduct?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeOrder?: boolean;

	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	@Transform(transformStringToNumber)
	page?: number;

	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	@Transform(transformStringToNumber)
	limit?: number;
}
