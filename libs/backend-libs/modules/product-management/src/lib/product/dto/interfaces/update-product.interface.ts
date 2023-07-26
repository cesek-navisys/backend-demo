import { IProductCreate } from './create-product.interface';

export interface IProductUpdate extends Partial<IProductCreate> {
	code: string;
}
