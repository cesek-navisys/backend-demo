import { ApiProperty } from '@nestjs/swagger';
import { IIntroduceYourself } from './interfaces/introduce-yourself.interface';
import { IsDate, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class IntroduceYourselfDto implements IIntroduceYourself {
    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    @Length(3)
    firstName: string;

    @ApiProperty({ example: 'Lennon' })
    @IsNotEmpty()
    @Length(5)
    @Matches(/^[A-Z][a-z]+$/, { message: `lastName does not meet required rules` })
    lastName: string;

    @ApiProperty({ example: new Date() })
    @Type(() => Date)
    @IsDate()
    birthday: Date;
}