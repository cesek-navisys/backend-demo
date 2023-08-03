import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IProductViewMapper } from './interfaces/view-product-mapper.interface';
import { ViewAccountDto } from '@backend-demo/backend-libs/modules/account-management';
import { ViewProductDto } from './view-product.dto';

export class ViewProductMapperDto
	extends ViewProductDto
	implements IProductViewMapper
{
	@ApiPropertyOptional({
		type: ViewAccountDto,
	})
	@Type(() => ViewAccountDto)
	@Expose()
	Account?: ViewAccountDto;
}
