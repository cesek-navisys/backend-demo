import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@backend-demo/backend-libs/tables';
import { ProductReadService } from './product-read.service';
import {
	IProductCreateManyParams,
	IProductCreateOneParams,
	IProductUpdateManyParams,
	IProductUpdateOneParams,
	IProductUpsertOneParams,
} from './interfaces/product-write.interfaces';

@Injectable()
export class ProductWriteService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product,
		private productReadService: ProductReadService
	) {}

	async createOne(params: IProductCreateOneParams): Promise<Product> {
		const product = await this.productRepository.create(params);
		return product.save();
	}

	async createMany(params: IProductCreateManyParams): Promise<Product[]> {
		return await this.productRepository.bulkCreate(params.products);
	}

	async upsertOne(params: IProductUpsertOneParams): Promise<Product> {
		const [product] = await this.productRepository.upsert(params);

		const existingProduct = await this.productReadService.findOne({
			code: params.code,
		});
		if (existingProduct) {
			throw new Error(`Product with code ${params.code} already exists.`);
		}

		return product;
	}

	async updateOne(
		productCode: string,
		params: IProductUpdateOneParams
	): Promise<[number, Product[]]> {
		const { code, ...changes } = params;

		const existingProduct = await this.productReadService.findOne({
			code: params.code,
		});
		if (existingProduct) {
			throw new Error(`Product with code ${params.code} already exists.`);
		}

		return await this.productRepository.update(changes, {
			where: { code: productCode },
			returning: true,
		});
	}

	async updateMany(
		params: IProductUpdateManyParams
	): Promise<[number, Product[]]> {
		const { OwnerCode, ...changes } = params;

		const count = await this.productReadService.count({ OwnerCode });
		if (count === 0) {
			throw new Error(`No products found for OwnerCode ${OwnerCode}.`);
		}

		return await this.productRepository.update(changes, {
			where: { OwnerCode },
			returning: true,
		});
	}
}
