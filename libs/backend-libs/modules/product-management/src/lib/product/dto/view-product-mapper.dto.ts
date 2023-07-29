import { ApiPropertyOptional } from '@nestjs/swagger';
import { IProductViewMapper } from './interfaces/view-product-mapper.interface';
import { ViewProductDto } from './view-product.dto';
import { ViewAccountDto } from '@backend-demo/backend-libs/modules/account-management';
import { Type } from 'class-transformer';

export class ViewProductMapperDto
	extends ViewProductDto
	implements IProductViewMapper
{
	@ApiPropertyOptional({
		type: [ViewAccountDto],
	})
	@Type(() => ViewAccountDto)
	Account?: ViewAccountDto;
}
