import { CreateProductDto } from './create-product.dto';
import { IProductUpdate } from './interfaces/update-product.interface';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductDto
	extends PartialType(CreateProductDto)
	implements IProductUpdate {}
