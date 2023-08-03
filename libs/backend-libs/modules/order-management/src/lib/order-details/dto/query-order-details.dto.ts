import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IOrderDetailsQueryMany,
	IOrderDetailsQueryOne,
} from './interfaces/query-order-details.interface';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDetailsQueryDto
	implements IOrderDetailsQueryOne, IOrderDetailsQueryMany
{
	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	includeProduct?: boolean;

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
