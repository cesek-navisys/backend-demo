/**
 * v předchozích verzch se používal název souboru také "cross-order-view.interface.ts"
 *
 * view-order-mapper bude importovat view-order
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderViewMapper } from './interfaces';
import { Type } from 'class-transformer';
import { ViewAccountDto } from '@backend-demo/backend-libs/modules/account-management';
import { ViewOrderDetailsDto } from '../../order-details/dto/view-order-details.dto';
import { ViewOrderDto } from './view-order.dto';

export class ViewOrderMapperDto
	extends ViewOrderDto
	implements IOrderViewMapper
{
	@ApiPropertyOptional()
	@Type(() => ViewAccountDto)
	account?: ViewAccountDto;

	@ApiPropertyOptional()
	@Type(() => ViewOrderDetailsDto)
	orderDetails?: ViewOrderDetailsDto;
}
