import { IAccountUpdate } from './interfaces/update-account.interface';

export class UpdateAccountDto implements IAccountUpdate {
  code!: string;
}
