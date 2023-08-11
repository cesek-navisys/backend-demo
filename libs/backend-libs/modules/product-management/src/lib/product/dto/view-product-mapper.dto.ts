import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IProductViewMapper } from './interfaces/view-product-mapper.interface';
import { ViewAccountDto } from '@backend-demo/backend-libs/modules/account-management';
import { ViewOrderDetailsDto } from 'libs/backend-libs/modules/order-management/src/lib/order-details/dto';
import { ViewProductDto } from './view-product.dto';

export class ViewProductMapperDto
	extends ViewProductDto
	implements IProductViewMapper
{
	@ApiPropertyOptional()
	@Type(() => ViewAccountDto)
	@Expose()
	Account?: ViewAccountDto;

	@ApiPropertyOptional()
	@Type(() => ViewOrderDetailsDto)
	@Expose()
	OrderDetails?: ViewOrderDetailsDto;
}
