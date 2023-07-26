/**
 * v předchozích verzch se používal název souboru také "cross-order-view.interface.ts"
 *
 * view-order-mapper bude importovat view-order
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IOrderViewMapper } from './interfaces';
import { ViewOrderDto } from './view-order.dto';
import { Account, OrderDetails } from '@backend-demo/backend-libs/tables';

export class ViewOrderMapperDto
	extends ViewOrderDto
	implements IOrderViewMapper
{
	@ApiPropertyOptional({
		type: Account,
	})
	account?: any;

	@ApiPropertyOptional({
		type: OrderDetails,
	})
	orderDetails?: any;
}
