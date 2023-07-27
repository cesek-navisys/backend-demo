const orderRoot = `accounts/:accountCode`;

export const orderManagementRoutes = {
    order: `${orderRoot}/orders`,
    orderDetails: `${orderRoot}/orders/:orderCode/order-details`
} as const;