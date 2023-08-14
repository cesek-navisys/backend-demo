import { ApiProperty } from '@nestjs/swagger';
import { IOrderCreate } from './interfaces/create-order.interface';
import { IsBoolean, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto implements IOrderCreate {
	@ApiProperty({ example: 'Please sir. Read my message!' })
	@Length(10, 255)
	messageForOwner!: string;

	@ApiProperty({ example: false })
	@Type(() => Boolean)
	@IsBoolean()
	confirmed!: boolean;
}
