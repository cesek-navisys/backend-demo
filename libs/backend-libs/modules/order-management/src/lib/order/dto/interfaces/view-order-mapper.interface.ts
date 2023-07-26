/**
 * v předchozích verzch se používal název souboru také "cross-order-view.interface.ts"
 *
 * view-order-mapper bude importovat view-order
 *
 * IOrderViewMapper
 */

import { IOrderView } from './view-order.interface';
export interface IOrderViewMapper extends IOrderView {
	account?: any;
	orderDetails?: any;
}
