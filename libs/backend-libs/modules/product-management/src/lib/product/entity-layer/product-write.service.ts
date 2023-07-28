import { Product } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	ICreateProduct,
	IProductCreateParams,
	IProductUpdateManyParams,
	IProductUpdateParams,
	IProductUpsertParams,
	IUpdateManyProduct,
	IUpdateProduct,
	IUpsertProduct,
} from './interfaces/product-write.interfaces';
import { ProductReadService } from './product-read.service';

@Injectable()
export class ProductWriteService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product,
		private productReadService: ProductReadService
	) {}

	async createOne(
		params: IProductCreateParams,
		createProduct: ICreateProduct
	): Promise<Product> {
		const { name, description, price, color } = createProduct;
		const product = await this.productRepository.create({
			AccountCode: params.accountCode,
			color,
			description,
			name,
			price,
		});
		return product.save();
	}

	async createMany(
		params: IProductCreateParams,
		createProduct: ICreateProduct[]
	): Promise<Product[]> {
		const products = await Promise.all(
			createProduct.map(async (productParams) => {
				const product = await this.productRepository.create({
					AccountCode: params.accountCode,
					color: productParams.color,
					description: productParams.description,
					name: productParams.name,
					price: productParams.price,
				});
				return product.save();
			})
		);
		return products;
	}

	async upsertOne(
		params: IProductUpsertParams,
		upsertProduct: IUpsertProduct
	): Promise<Product> {
		const { accountCode } = params;
		const { color, description, name, price } = upsertProduct;

		if (!name || !description || price === undefined) {
			throw new Error('Name, description, and price must be defined');
		}

		const [product] = await this.productRepository.upsert({
			AccountCode: accountCode,
			name,
			color,
			description,
			price,
		});
		return product;
	}

	async updateOne(
		params: IProductUpdateParams,
		updateProduct: IUpdateProduct
	): Promise<Product> {
		const { accountCode, productCode } = params;
		const existingProduct = await this.productReadService.findOne({
			productCode,
			accountCode,
		});
		if (!existingProduct) {
			throw new Error(
				`Product with code ${params.productCode} already exists.`
			);
		}
		const updatedProduct = await existingProduct.update(updateProduct);
		return updatedProduct;
	}

	async updateMany(
		params: IProductUpdateManyParams,
		updateProducts: IUpdateManyProduct[]
	): Promise<Product[]> {
		const { accountCode } = params;
		const updatedProducts: Product[] = [];

		for (const updateProduct of updateProducts) {
			const { productCode, ...updateProps } = updateProduct;
			const [numberOfAffectedRows, affectedRows] =
				await this.productRepository.update(updateProps, {
					where: {
						AccountCode: accountCode,
						code: productCode,
					},
					returning: true,
				});

			if (numberOfAffectedRows === 0) {
				throw new Error(
					`Product with code ${productCode} does not exist.`
				);
			}

			updatedProducts.push(affectedRows[0]);
		}

		return updatedProducts;
	}
}
