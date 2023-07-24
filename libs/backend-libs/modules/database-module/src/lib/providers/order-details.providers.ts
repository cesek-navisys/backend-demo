import { OrderDetails } from '@backend-demo/backend-libs/tables';

export const orderDetailsProviders = [
	{
		provide: 'ORDER_DETAILS_REPOSITORY',
		useValue: OrderDetails,
	},
];
