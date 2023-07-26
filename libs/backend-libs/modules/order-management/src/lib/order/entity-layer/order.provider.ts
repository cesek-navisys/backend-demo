/**
 * provider definition
 */

import { Order } from '@backend-demo/backend-libs/tables';

export const orderProviders = [
	{
		provide: 'ORDER_REPOSITORY',
		useValue: Order,
	},
];
