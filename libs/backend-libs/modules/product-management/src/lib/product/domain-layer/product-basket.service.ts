import { Injectable } from '@nestjs/common';
import { Product } from '@backend-demo/backend-libs/tables';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ProductBasketService {
	constructor(
		private readonly productRepository: typeof Product,
		private readonly commandBus: CommandBus,
	) {}

	async addToBasket(params: { accountCode: string, productCode: string }) {
		return this.productRepository.sequelize!.transaction(async () => {
			const orderDetails = this.commandBus.execute()
		})
	}
}
