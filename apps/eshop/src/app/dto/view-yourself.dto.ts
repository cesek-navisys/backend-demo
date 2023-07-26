import { ApiProperty } from '@nestjs/swagger';
import { IYourselfView } from './interfaces/view-yourself.interface';
import { Expose } from 'class-transformer';

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
}