import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './interfaces/query-product.interface';
import { IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductQueryDto implements IProductQueryOne, IProductQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	@Transform(({ value }) => Boolean(value))
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	@Transform(({ value }) => Boolean(value))
	includeAccount?: boolean;

	@ApiPropertyOptional({
		default: 10,
		type: Number,
	})
	@IsNumber()
	@Transform(({ value }) => Number(value))
	limit?: number;

	@ApiPropertyOptional({
		default: 1,
		type: Number,
	})
	@IsNumber()
	@Transform(({ value }) => Number(value))
	page?: number;
}
