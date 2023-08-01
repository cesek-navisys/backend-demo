import { IOrderCreate } from './interfaces/create-order.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, Length } from 'class-validator';

export class CreateOrderDto implements IOrderCreate {
	@ApiProperty({ example: 'Please sir. Read my message!' })
	@Length(10, 255)
	messageForOwner!: string;

	@ApiProperty({ example: false })
	@Type(() => Boolean)
	@IsBoolean()
	confirmed!: boolean;
}
