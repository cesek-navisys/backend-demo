import { IAccountCreate } from './interfaces/create-account.interface';

export class CreateAccountDto implements IAccountCreate {
	name!: string;
	surname!: string;
	email!: string;
	phone!: string;
	address!: string;
}
