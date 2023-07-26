import { ApiProduces, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IProductUpdate } from './interfaces/update-product.interface';

export class UpdateProductDto
	extends PartialType(CreateProductDto)
	implements IProductUpdate
{
	@ApiProperty()
	code!: string;
}
