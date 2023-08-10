/**
 * nebude importovat nic z jiných modulů/domén
 *
 * IOrderView
 */

export interface IOrderView {
	code: string;
	messageForOwner: string;
	AccountCode: string;
	confirmed: boolean;
}
