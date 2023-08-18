export * from './lib/account.table';
export * from './lib/order-details.table';
export * from './lib/order.table';
export * from './lib/product.table';
export * from './lib/product-size.table';

import { Account } from './lib/account.table';
import { Order } from './lib/order.table';
import { OrderDetails } from './lib/order-details.table';
import { Product } from './lib/product.table';
import { ProductSize } from './lib/product-size.table';

export const databaseModels = [Account, OrderDetails, Order, Product, ProductSize];
