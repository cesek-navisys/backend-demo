import { IOrderCreate } from './interfaces/create-order.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto implements IOrderCreate {
	@ApiProperty({
		type: String,
	})
	messageForOwner!: string;

	@ApiProperty({
		type: String,
	})
	code!: string;

	@ApiProperty({
		type: Boolean,
	})
	confirmed!: boolean;
}
