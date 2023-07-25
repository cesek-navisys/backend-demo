/**
 * nebude importovat nic z jiných modulů/domén
 *
 * IAccountView
 * nesmí importovat zadne jine dto
 */

export interface IAccountView {
  name: string;
	surname: string;
	email: string;
	phone: string;
	address: string;
} 