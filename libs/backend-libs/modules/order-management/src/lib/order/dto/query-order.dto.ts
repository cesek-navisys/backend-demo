/**
 * classes implementing IOrderQueryOne and IOrderQueryMany
 */

import { IOrderQueryMany, IOrderQueryOne } from './interfaces';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class OrderQueryDto implements IOrderQueryOne, IOrderQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
	})
	includeAccount?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	includeOrderDetails?: boolean;

	@ApiPropertyOptional({
		type: Boolean,
	})
	includeCount?: boolean;

	@ApiPropertyOptional({
		type: Number,
	})
	page?: number;

	@ApiPropertyOptional({
		type: Number,
	})
	limit?: number;
}
