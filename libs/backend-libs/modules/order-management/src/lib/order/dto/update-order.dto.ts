import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderUpdate } from './interfaces';

export class UpdateOrderDto implements IOrderUpdate {
	@ApiPropertyOptional({
		type: String,
	})
	messageForOwner?: string;

	@ApiPropertyOptional({
		type: Boolean,
	})
	confirmed?: boolean;
}
