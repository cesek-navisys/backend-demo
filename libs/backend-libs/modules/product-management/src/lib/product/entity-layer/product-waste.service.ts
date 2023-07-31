import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@backend-demo/backend-libs/tables';
import { ProductReadService } from './product-read.service';
import {
	IProductDeleteParams,
	IProductRestoreParams,
} from './interfaces/product-waste.interfaces';

@Injectable()
export class ProductWasteService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product,
		private productReadService: ProductReadService
	) {}

	async delete(params: IProductDeleteParams): Promise<void> {
		const { accountCode, productCode } = params;
		const product = this.productReadService.findOne({
			productCode,
			accountCode,
		});

		if (!product) {
			throw new Error(`Product with code ${productCode} does not exist.`);
		}

		this.productRepository.destroy({
			where: { code: productCode },
		});
	}

	async restore(params: IProductRestoreParams): Promise<Product> {
		const { accountCode, productCode } = params;
		this.productRepository.restore({
			where: {
				code: productCode,
				AccountCode: accountCode,
			},
		});

		const product = await this.productReadService.findOne({
			productCode,
			accountCode,
		});

		if (!product) {
			throw new Error(`Product with code ${productCode} does not exist.`);
		}
		return product;
	}
}
