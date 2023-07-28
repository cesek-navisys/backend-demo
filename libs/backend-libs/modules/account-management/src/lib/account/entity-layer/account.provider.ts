import { Account } from '@backend-demo/backend-libs/tables';

export const accountProvider = [
	{
		provide: 'ACCOUNT_REPOSITORY',
		useValue: Account,
	},
];
