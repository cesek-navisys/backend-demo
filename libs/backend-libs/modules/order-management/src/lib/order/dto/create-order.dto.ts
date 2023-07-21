import { IOrderCreate } from './interfaces/create-order.interface';

export class CreateOrderDto implements IOrderCreate {
    description!: string;
    date!: Date;
}