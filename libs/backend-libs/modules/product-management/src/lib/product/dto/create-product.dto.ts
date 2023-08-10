import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Color } from '@backend-demo/shared/enums';
import { IProductCreate } from './interfaces/create-product.interface';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto implements IProductCreate {
	@ApiProperty({
		required: true,
		example: 'The best thing ever',
	})
	@IsNotEmpty()
	@Length(5)
	name!: string;

	@ApiProperty({
		required: true,
		example: 'This is a description',
	})
	description!: string;

	@ApiProperty({
		default: 0,
		minimum: 0,
		required: true,
		type: Number,
	})
	price!: number;

	@ApiPropertyOptional({
		enum: Color,
	})
	color?: Color;
}
