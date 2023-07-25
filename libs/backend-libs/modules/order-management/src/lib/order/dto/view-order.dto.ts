/**
 * nebude importovat nic z jiných modulů/domén
 */

import { ApiProperty } from '@nestjs/swagger';
import { IOrderView } from './interfaces';

export class ViewOrderDto implements IOrderView {
	@ApiProperty({
		type: String,
	})
	code!: string;

	@ApiProperty({
		type: String,
	})
	messageForOwner!: string;

	@ApiProperty({
		type: String,
	})
	accountCode!: string;
}
