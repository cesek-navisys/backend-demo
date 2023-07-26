import { Product } from '@backend-demo/backend-libs/tables';

export const productProviders = [
	{
		provide: 'PRODUCTS_REPOSITORY',
		useValue: Product,
	},
];
