import { Injectable } from '@nestjs/common';
import { IIntroduceYourself } from './dto/interfaces/introduce-yourself.interface';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return ({ message: 'Hello API' });
  }

  introduceYourself(yourself: IIntroduceYourself): IIntroduceYourself {
    return {
      firstName: yourself.firstName,
      lastName: yourself.lastName,
      birthday: yourself.birthday,
    }
  }

}
