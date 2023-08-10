import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IAccountCreate } from './interfaces/create-account.interface';

export class CreateAccountDto implements IAccountCreate {
	@ApiProperty({ required: true, example: 'Karel' })
	@IsNotEmpty()
	name!: string;

	@ApiProperty({ required: true, example: 'Novák' })
	@IsNotEmpty()
	surname!: string;

	@ApiProperty({ required: true, example: 'karel.novak@email.cz' })
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@ApiPropertyOptional({ example: '+420602456789' })
	@IsPhoneNumber('CZ')
	phone?: string;

	@ApiProperty({ required: true, example: 'Nová ulice 65' })
	address!: string;
}
