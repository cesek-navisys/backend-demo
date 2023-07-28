import { Color } from '@backend-demo/shared/enums';
import { IProductCreate } from './interfaces/create-product.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateProductDto implements IProductCreate {
	@ApiProperty({
		example: 'abf50445-9e57-4805-9a54-b923ec67b572',
		required: true,
	})
	AccountCode!: string;

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
