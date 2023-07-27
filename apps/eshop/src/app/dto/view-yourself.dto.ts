import { ApiProperty } from '@nestjs/swagger';
import { IYourselfView } from './interfaces/view-yourself.interface';
import { Expose, Type } from 'class-transformer';
import { ViewProductDto } from '@backend-demo/backend-libs/modules/product-management';

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
