/**
 * classes implementing IOrderQueryOne and IOrderQueryMany
 */

import { Type } from 'class-transformer';
import { IOrderQueryMany, IOrderQueryOne } from './interfaces';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class OrderQueryDto implements IOrderQueryOne, IOrderQueryMany {
	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	includeAccount?: boolean;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	includeOrderDetails?: boolean;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	includeCount?: boolean;

	@ApiPropertyOptional({ example: 1 })
	@Type(() => Number)
	@IsNumber()
	page?: number;

	@ApiPropertyOptional({ example: 10 })
	@Type(() => Number)
	@IsNumber()
	limit?: number;
}
