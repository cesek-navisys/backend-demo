import { ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderDetailsViewMapper } from './interfaces/view-order-details-mapper.interface';
import { Expose, Type } from 'class-transformer';
import { ViewOrderDetailsDto } from './view-order-details.dto';
import { ViewOrderDto } from '../../order/dto';
import { ViewProductDto } from '@backend-demo/backend-libs/modules/product-management';

export class ViewOrderDetailsMapperDto
	extends ViewOrderDetailsDto
	implements IOrderDetailsViewMapper
{
	@ApiPropertyOptional()
	@Type(() => ViewOrderDto)
	@Expose()
	Order?: ViewOrderDto;

	@ApiPropertyOptional()
	@Type(() => ViewProductDto)
	@Expose()
	Product?: ViewProductDto;
}
