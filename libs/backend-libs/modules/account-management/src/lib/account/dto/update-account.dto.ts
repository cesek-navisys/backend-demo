import { ApiPropertyOptional } from '@nestjs/swagger';
import { IAccountUpdate } from './interfaces/update-account.interface';

export class UpdateAccountDto implements IAccountUpdate {
	@ApiPropertyOptional()
	name?: string;
	@ApiPropertyOptional()
	surname?: string;
	@ApiPropertyOptional()
	email?: string;
	@ApiPropertyOptional()
	phone?: string;
	@ApiPropertyOptional()
	address?: string;
}
