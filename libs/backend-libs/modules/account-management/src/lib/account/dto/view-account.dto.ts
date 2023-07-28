import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IAccountView } from './interfaces/view-account.interface';
import { Expose } from '@nestjs/class-transformer';

export class ViewAccountDto implements IAccountView {
	@Expose()
	@ApiProperty({
		required: true,
		example: 'c3ce9db4-0e90-4cd8-9d60-52013371334b',
	})
	code!: string;

	@Expose()
	@ApiProperty({ required: true, example: 'Karel' })
	name!: string;

	@Expose()
	@ApiProperty({ required: true, example: 'Novák' })
	surname!: string;

	@Expose()
	@ApiProperty({ required: true, example: 'karel.novak@email.cz' })
	email!: string;

	@Expose()
	@ApiPropertyOptional({ example: '+420123456789' })
	phone!: string;

	@Expose()
	@ApiProperty({ required: true, example: 'Nová ulice 65' })
	address!: string;
}
