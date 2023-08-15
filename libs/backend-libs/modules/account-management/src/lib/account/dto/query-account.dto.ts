import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformStringToBoolean } from '@backend-demo/shared/transformers';
import {
	IAccountQueryMany,
	IAccountQueryOne,
} from './interfaces/query-account.interface';

export class QueryOneAccountDto implements IAccountQueryOne {}

export class QueryManyAccountDto implements IAccountQueryMany {
	@ApiPropertyOptional({
		type: Boolean,
		default: null,
	})
	@IsOptional()
	@Transform(transformStringToBoolean)
	isActive?: boolean;

	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	page?: number;

	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	limit?: number;
}
