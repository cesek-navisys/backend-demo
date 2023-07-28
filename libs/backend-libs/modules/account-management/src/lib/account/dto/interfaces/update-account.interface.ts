import { IAccountCreate } from './create-account.interface';

export interface IAccountUpdate extends Partial<IAccountCreate> {}
