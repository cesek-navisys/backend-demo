import { ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderQueryMany, IOrderQueryOne } from './interfaces';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import {
	transformStringToBoolean,
	transformStringToNumber,
} from '@backend-demo/shared/transformers';

export class OrderQueryDto implements IOrderQueryOne, IOrderQueryMany {
	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeAccount?: boolean;

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeOrderDetails?: boolean;

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeCount?: boolean;

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

	@ApiPropertyOptional()
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	filterWithOrderDetails?: boolean;

	@ApiPropertyOptional()
	@IsNumber()
	@IsOptional()
	@Transform(transformStringToNumber)
	totalPrice?: number;
}
