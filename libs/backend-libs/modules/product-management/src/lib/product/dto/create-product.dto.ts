import { Color } from '@backend-demo/shared/enums';
import { IProductCreate } from './interfaces/create-product.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto implements IProductCreate {
	@ApiProperty({
		required: true,
		type: String,
	})
	name!: string;

	@ApiProperty({
		required: true,
		type: String,
	})
	description!: string;

	@ApiProperty({
		default: 0,
		minimum: 0,
		required: true,
		type: Number,
	})
	price!: number;

	@ApiProperty({
		enum: Color,
		required: false,
	})
	color?: Color;

	@ApiProperty({
		required: true,
	})
	OwnerCode!: string;
}
