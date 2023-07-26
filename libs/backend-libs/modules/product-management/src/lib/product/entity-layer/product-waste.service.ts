import { Product } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import { ProductReadService } from './product-read.service';
import { IProductDeleteParams } from './interfaces/product-waste.interfaces';

@Injectable()
export class ProductWasteService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product,
		private productReadService: ProductReadService
	) {}

	async delete(productCode: string): Promise<void> {
		const product = await this.productReadService.findOne({
			code: productCode,
		});

		if (!product) {
			throw new Error(`Product with code ${productCode} does not exist.`);
		}

		await this.productRepository.destroy({
			where: { code: productCode },
		});
	}

	async restore(productCode: string): Promise<Product> {
		await this.productRepository.restore({
			where: { code: productCode },
		});

		const product = await this.productReadService.findOne({
			code: productCode,
		});
		if (!product) {
			throw new Error(`Product with code ${productCode} does not exist.`);
		}
		return product;
	}
}
