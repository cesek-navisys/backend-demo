import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './interfaces/query-product.interface';
import {
	transformStringToBoolean,
	transformStringToNumber,
} from '@backend-demo/shared/transformers';

export class ProductQueryDto implements IProductQueryOne, IProductQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	includeAccount?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	@IsBoolean()
	@IsOptional()
	@Transform(transformStringToBoolean)
	filteredByPrice?: boolean;

	@ApiPropertyOptional({
		default: 10,
		type: Number,
	})
	@IsNumber()
	@IsOptional()
	@Transform(transformStringToNumber)
	limit?: number;

	@ApiPropertyOptional({
		default: 1,
		type: Number,
	})
	@IsNumber()
	@IsOptional()
	@Transform(transformStringToNumber)
	page?: number;
}
