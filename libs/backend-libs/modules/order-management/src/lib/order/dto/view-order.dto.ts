/**
 * nebude importovat nic z jiných modulů/domén
 */

import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IOrderView } from './interfaces';

export class ViewOrderDto implements IOrderView {
	@ApiProperty()
	@Expose()
	code!: string;

	@ApiProperty()
	@Expose()
	messageForOwner!: string;

	@ApiProperty()
	@Expose()
	AccountCode!: string;

	@ApiProperty()
	@Type(() => Boolean)
	@Expose()
	confirmed!: boolean;
}
