import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IYourselfView } from './interfaces/view-yourself.interface';

export class ViewYourselfDto implements IYourselfView {
	@ApiProperty()
	@Expose({ name: 'firstName' })
	name: string;

	@ApiProperty()
	@Expose({ name: 'lastName' })
	surname: string;

	@ApiProperty()
	@Expose()
	birthday: Date;

	/**
	 * Example how to expose another linked (included) dto
	 */
	// @ApiProperty()
	// @Expose('Product')
	// @Type(() => ViewProductDto)
	// product?: ViewProductDto;
}
