import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './interfaces/query-product.interface';
import { IsBoolean, IsNumber } from 'class-validator';

export class ProductQueryDto implements IProductQueryOne, IProductQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
		default: false,
	})
	@IsBoolean()
	includeAccount?: boolean;

	@ApiPropertyOptional({
		default: 10,
		type: Number,
	})
	@IsNumber()
	limit?: number;

	@ApiPropertyOptional({
		default: 1,
		type: Number,
	})
	@IsNumber()
	page?: number;
}
