import { ORDER_CODE_API_PARAM } from '@backend-demo/shared/constants';

const orderRoot = `accounts/:accountCode`;

export const orderManagementRoutes = {
	order: `${orderRoot}/orders`,
	orderDetails: `${orderRoot}/order/:orderCode/order-details`,
	orderRestore: `:${ORDER_CODE_API_PARAM}/restore`,
	orderConfirm: `:${ORDER_CODE_API_PARAM}/confirm`,
	orderGetReceipt: `:${ORDER_CODE_API_PARAM}/receipt`,
} as const;
