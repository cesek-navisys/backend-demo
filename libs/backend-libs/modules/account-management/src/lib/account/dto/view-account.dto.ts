import { IAccountView } from "./interfaces/view-account.interface";

export class ViewAccountDto implements IAccountView {
  name!: string;
  surname!: string;
  email!: string;
  phone!: string;
  address!: string;
}