import { IOrderDetailsView } from './view-order-details.interface';
import { IOrderView } from '@backend-demo/backend-libs/modules/order-management';
import { IProductView } from '@backend-demo/backend-libs/modules/product-management';

export interface IOrderDetailsViewMapper extends IOrderDetailsView {
	Order?: IOrderView;
	Product?: IProductView;
}
