import { IAccountView } from './interfaces/view-account.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ViewAccountDto implements IAccountView {
	@ApiProperty({ required: true, type: String })
	code!: string;

	@ApiProperty({ required: true, type: String })
	name!: string;

	@ApiProperty({ required: true, type: String })
	surname!: string;

	@ApiProperty({ required: true, type: String })
	email!: string;

	@ApiPropertyOptional({ type: String })
	phone!: string;

	@ApiProperty({ required: true, type: String })
	address!: string;
}
