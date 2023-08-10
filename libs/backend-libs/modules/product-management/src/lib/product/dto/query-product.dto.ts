import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './interfaces/query-product.interface';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductQueryDto implements IProductQueryOne, IProductQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => Boolean(value))
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => Boolean(value))
	includeAccount?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => Boolean(value))
	filteredByPrice?: boolean;

	@ApiPropertyOptional({
		default: 10,
		type: Number,
	})
	@IsNumber()
	@IsOptional()
	@Transform(({ value }) => Number(value))
	limit?: number;

	@ApiPropertyOptional({
		default: 1,
		type: Number,
	})
	@IsNumber()
	@IsOptional()
	@Transform(({ value }) => Number(value))
	page?: number;
}
