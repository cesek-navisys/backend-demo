import { CODE_ALIAS, S_ALIAS } from './base.constants';

export const ORDER_ALIAS = 'Order';
const ORDER_API_PARAM = 'order';

export const ORDERS_ALIAS = `${ORDER_ALIAS}${S_ALIAS}` as const;

export const ORDER_CODE_ALIAS = `${ORDER_ALIAS}${CODE_ALIAS}` as const;

export const ORDER_CODE_API_PARAM = `${ORDER_API_PARAM}${CODE_ALIAS}` as const;