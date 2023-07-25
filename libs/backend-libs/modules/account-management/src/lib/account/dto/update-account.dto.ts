import { IAccountUpdate } from './interfaces/update-account.interface';

export class UpdateAccountDto implements IAccountUpdate {
  code!: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  address?: string;
}
