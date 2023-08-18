import { CODE_ALIAS, S_ALIAS } from './base.constants';

export const ACCOUNT_ALIAS = 'Account';
const ACCOUNT_API_PARAM = 'account';
export const ACCOUNTS_ALIAS = `${ACCOUNT_ALIAS}${S_ALIAS}` as const;

export const ACCOUNT_CODE_ALIAS = `${ACCOUNT_ALIAS}${CODE_ALIAS}` as const;
export const ACCOUNT_CODE_API_PARAM =
	`${ACCOUNT_API_PARAM}${CODE_ALIAS}` as const;

export const ACCOUNT_TABLE_NAME_PLURAL = `${ACCOUNTS_ALIAS}` as const;
export const ACCOUNT_TABLE_NAME_SINGULAR = `${ACCOUNT_ALIAS}` as const;
