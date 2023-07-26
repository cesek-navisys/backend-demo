import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './interfaces/query-product.interface';

export class ProductQueryDto implements IProductQueryOne, IProductQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
	})
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	includeOwner?: boolean;

	@ApiPropertyOptional({
		default: 10,
		type: Number,
	})
	limit?: number;

	@ApiPropertyOptional({
		default: 1,
		type: Number,
	})
	page?: number;
}
