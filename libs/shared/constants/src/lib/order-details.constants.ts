import { CODE_ALIAS } from './base.constants';
import { ORDER_ALIAS } from './order.constants';

export const ORDER_DETAILS_ALIAS = `${ORDER_ALIAS}Details` as const;
export const ORDER_DETAILS_CODE_ALIAS =
	`${ORDER_DETAILS_ALIAS}${CODE_ALIAS}` as const;
