import { Account } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_REPOSITORY } from '@backend-demo/shared/constants';

export const accountProvider = [
	{
		provide: ACCOUNT_REPOSITORY,
		useValue: Account,
	},
];
