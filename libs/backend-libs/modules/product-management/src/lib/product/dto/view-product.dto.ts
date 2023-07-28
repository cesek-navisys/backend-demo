import { ApiProperty } from '@nestjs/swagger';
import { IProductView } from './interfaces/view-product.interface';
import { IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

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
	@IsNumber()
	@Expose()
	price!: number;

	@ApiProperty()
	@Expose()
	AccountCode!: string;
}
