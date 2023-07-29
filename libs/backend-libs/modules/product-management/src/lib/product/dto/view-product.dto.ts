import { Color } from '@backend-demo/shared/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IProductView } from './interfaces/view-product.interface';

export class ViewProductDto implements IProductView {
	@ApiProperty()
	@Expose()
	code!: string;

	@ApiProperty()
	@Expose()
	name!: string;

	@ApiProperty()
	@Expose()
	description!: string;

	@ApiProperty()
	@Expose()
	price!: number;

	@ApiProperty()
	@Expose()
	color?: Color;

	@ApiProperty()
	@Expose()
	AccountCode!: string;
}
