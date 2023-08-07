import { Command } from '@nestjs-architects/typed-cqrs';
import { OrderDetails } from '@backend-demo/backend-libs/tables';

export interface ICreateOrderDetailsCommand {
	productCode: string;
	accountCode: string;
	quantity: number;
}

export class CreateOrderDetailsCommand extends Command<OrderDetails> {
	constructor(public readonly params: ICreateOrderDetailsCommand) {
		super();
	}
}
