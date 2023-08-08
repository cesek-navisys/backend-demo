import { Product } from '@backend-demo/backend-libs/tables';

export const productProvider = [
	{
		provide: 'PRODUCTS_REPOSITORY',
		useValue: Product,
	},
];
