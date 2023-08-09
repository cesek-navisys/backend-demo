import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@backend-demo/backend-libs/tables';
import { CommandBus } from '@nestjs/cqrs';
import {
	CreateOrderDetailsCommand,
	ICreateOrderDetailsCommand,
} from '@backend-demo/backend-libs/commands';

@Injectable()
export class ProductBasketService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private readonly productRepository: typeof Product,
		private readonly commandBus: CommandBus
	) {}

	async addToBasket(params: ICreateOrderDetailsCommand) {
		return this.productRepository.sequelize!.transaction(async () => {
			return this.commandBus.execute(
				new CreateOrderDetailsCommand(params)
			);
		});
	}
}
