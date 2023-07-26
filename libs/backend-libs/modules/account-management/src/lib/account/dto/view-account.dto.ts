import { IAccountView } from "./interfaces/view-account.interface";

export class ViewAccountDto implements IAccountView {
  code!: string;
  name!: string;
  surname!: string;
  email!: string;
  phone!: string;
  address!: string;
}