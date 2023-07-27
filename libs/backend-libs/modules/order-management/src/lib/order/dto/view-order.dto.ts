/**
 * nebude importovat nic z jiných modulů/domén
 */

import { ApiProperty } from '@nestjs/swagger';
import { IOrderView } from './interfaces';
import { Expose, Type } from 'class-transformer';

export class ViewOrderDto implements IOrderView {
	@ApiProperty()
	@Expose()
	code!: string;

	@ApiProperty()
	@Expose()
	messageForOwner!: string;

	@ApiProperty()
	@Expose()
	accountCode!: string;

	@ApiProperty()
	@Type(() => Boolean)
	@Expose()
	confirmed!: boolean;
}
