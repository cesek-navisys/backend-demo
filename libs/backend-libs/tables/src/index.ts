export * from './lib/account.table';
export * from './lib/order-details.table';
export * from './lib/order.table';
export * from './lib/product.table';

import { Account } from './lib/account.table';
import { OrderDetails } from './lib/order-details.table';
import { Order } from './lib/order.table';
import { Product } from './lib/product.table';

export const databaseModels = [Account, OrderDetails, Order, Product];
