/**
 * v předchozích verzch se používal název souboru také "cross-order-view.interface.ts"
 *
 * view-order-mapper bude importovat view-order
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderViewMapper } from './interfaces';
import { ViewOrderDto } from './view-order.dto';
import { Account, OrderDetails } from '@backend-demo/backend-libs/tables';
import { Expose, Type } from 'class-transformer';

export class ViewOrderMapperDto
	extends ViewOrderDto
	implements IOrderViewMapper
{
	// @ApiPropertyOptional()
	// @Type(() => ViewAccountDto)
	// account?: ViewAccountDto;

	// @ApiPropertyOptional()
	// @Type(() => ViewOrderDetailsDto)
	// orderDetails?: ViewOrderDetailsDto;
}
