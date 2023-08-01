import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderUpdate } from './interfaces';
import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class UpdateOrderDto implements IOrderUpdate {
	@ApiPropertyOptional()
	messageForOwner?: string;

	@ApiPropertyOptional()
	@Type(() => Boolean)
	@IsBoolean()
	confirmed?: boolean;
}
