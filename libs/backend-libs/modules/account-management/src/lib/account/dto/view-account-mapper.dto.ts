import { ApiPropertyOptional } from '@nestjs/swagger';
import { IAccountViewMapper } from './interfaces/view-account-mapper.interface';
import { Expose, Type } from 'class-transformer';
import { ViewAccountDto } from './view-account.dto';
import { ViewProductDto } from '@backend-demo/backend-libs/modules/product-management';

export class ViewAccountMapperDto
	extends ViewAccountDto
	implements IAccountViewMapper
{
	@ApiPropertyOptional({
		type: ViewProductDto,
	})
	@Type(() => ViewProductDto)
	@Expose()
	Product?: ViewProductDto;
}
