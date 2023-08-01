import { ApiPropertyOptional } from '@nestjs/swagger';
import { IAccountUpdate } from './interfaces/update-account.interface';
import { IsEmail, IsOptional, IsPhoneNumber } from '@nestjs/class-validator';

export class UpdateAccountDto implements IAccountUpdate {
	@ApiPropertyOptional({ example: 'Karel' })
	@IsOptional()
	name?: string;

	@ApiPropertyOptional({ example: 'Novák' })
	@IsOptional()
	surname?: string;

	@ApiPropertyOptional({ example: 'karel.novak@email.cz' })
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiPropertyOptional({ example: '+420123456789' })
	@IsOptional()
	@IsPhoneNumber('CZ')
	phone?: string;

	@ApiPropertyOptional({ example: 'Nová ulice 65' })
	@IsOptional()
	address?: string;
}
