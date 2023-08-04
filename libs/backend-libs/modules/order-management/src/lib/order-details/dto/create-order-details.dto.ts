import { ApiProperty } from '@nestjs/swagger';
import { IOrderDetailsCreate } from './interfaces/create-order-details.interface';
import { IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailsDto implements IOrderDetailsCreate {
	@ApiProperty({ example: 3 })
	@Type(() => Number)
	@IsNumber()
	quantity!: number;

	@ApiProperty({ example: true })
	@Type(() => Boolean)
	@IsBoolean()
	canBeDeliveredSeparately!: boolean;
}
