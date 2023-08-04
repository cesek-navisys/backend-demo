import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IOrderDetailsView } from './interfaces/view-order-details.interface';

export class ViewOrderDetailsDto implements IOrderDetailsView {
	@ApiProperty()
	@Expose()
	code!: string;

	@ApiProperty()
	@Expose()
	quantity!: number;

	@ApiProperty()
	@Expose()
	canBeDeliveredSeparately!: boolean;

	@ApiProperty()
	@Expose()
	OrderCode!: string;

	@ApiProperty()
	@Expose()
	ProductCode!: string;
}
