import { ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderUpdate } from './interfaces';
import { IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto implements IOrderUpdate {
	@ApiPropertyOptional()
	messageForOwner?: string;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	confirmed?: boolean;
}
