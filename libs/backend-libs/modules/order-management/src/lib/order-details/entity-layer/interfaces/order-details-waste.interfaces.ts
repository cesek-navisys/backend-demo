import { IOrderDetailsFindOneParams } from './order-details-read.interfaces';

export interface IOrderDetailsDeleteParams extends IOrderDetailsFindOneParams {}

export interface IOrderDetailsRestoreParams
	extends IOrderDetailsFindOneParams {}
