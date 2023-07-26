import { IAccountUpdate } from './interfaces/update-account.interface';
import { ApiProperty} from '@nestjs/swagger';

export class UpdateAccountDto implements IAccountUpdate {
  @ApiProperty()
  code!: string;
}
