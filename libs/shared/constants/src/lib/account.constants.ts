import { CODE_ALIAS, S_ALIAS } from './base.constants';


export const ACCOUNT_ALIAS  = 'Account';
export const ACCOUNTS_ALIAS = `${ACCOUNT_ALIAS}${S_ALIAS}`  as const;

export const ACCOUNT_CODE_ALIAS = `${ACCOUNT_ALIAS}${CODE_ALIAS}` as const;