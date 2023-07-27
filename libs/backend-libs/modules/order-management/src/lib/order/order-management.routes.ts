import { ORDER_CODE_API_PARAM } from '@backend-demo/shared/constants';

const orderRoot = `accounts/:accountCode`;

export const orderManagementRoutes = {
	order: `${orderRoot}/order`,
	orderDetails: `${orderRoot}/order/:orderCode/order-details`,
	orderRestore: `restore/:${ORDER_CODE_API_PARAM}`,
	orderConfirm: `confirm/:${ORDER_CODE_API_PARAM}`,
	orderGetReceipt: `get-receipt/:${ORDER_CODE_API_PARAM}`,
} as const;
