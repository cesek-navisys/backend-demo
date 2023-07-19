import { CODE_ALIAS, S_ALIAS } from './base.constants';

export const PRODUCT_ALIAS = 'Product';
export const PRODUCTS_ALIAS = `${PRODUCT_ALIAS}${S_ALIAS}` as const;
export const PRODUCT_CODE_ALIAS = `${PRODUCT_ALIAS}${CODE_ALIAS}` as const;