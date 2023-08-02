import { IAccountView } from '@backend-demo/backend-libs/modules/account-management';
import { IProductView } from './view-product.interface';

// Nesmi se divat na dalsi mappery jenom na View
export interface IProductViewMapper extends IProductView {
	Account?: IAccountView;
}
