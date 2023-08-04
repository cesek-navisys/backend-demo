import { CreateOrderDetailsDto } from './create-order-details.dto';
import { IOrderDetailsUpdate } from './interfaces/update-order-details.interface';
import { PartialType } from '@nestjs/swagger';

export class UpdateOrderDetailDto
	extends PartialType(CreateOrderDetailsDto)
	implements IOrderDetailsUpdate {}
