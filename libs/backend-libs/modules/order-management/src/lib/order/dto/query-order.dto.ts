/**
 * classes implementing IOrderQueryOne and IOrderQueryMany
 */

import { Type } from 'class-transformer';
import { IOrderQueryMany, IOrderQueryOne } from './interfaces';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class OrderQueryDto implements IOrderQueryOne, IOrderQueryMany {
	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	includeAccount?: boolean;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	includeOrderDetails?: boolean;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	includeCount?: boolean;

	@ApiPropertyOptional({ example: 1 })
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	page?: number;

	@ApiPropertyOptional({ example: 10 })
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	limit?: number;
}
