import { ApiProperty } from '@nestjs/swagger';
import { IProductView } from './interfaces/view-product.interface';

export class ViewProductDto implements IProductView {
	@ApiProperty({
		type: String,
	})
	code!: string;

	@ApiProperty({
		type: String,
	})
	name!: string;

	@ApiProperty({
		type: String,
	})
	description!: string;

	@ApiProperty({
		type: String,
	})
	price!: number;

	@ApiProperty({
		type: String,
	})
	OwnerCode!: string;
}
