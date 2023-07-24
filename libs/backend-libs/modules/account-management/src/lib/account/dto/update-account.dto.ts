import { IAccountUpdate } from './interfaces/update-account.interface';

export class UpdateAccountDto implements IAccountUpdate {
  code!: string;
  name?: string | undefined;
  surname?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
}
