import {
	Account,
	OrderDetails,
	Product,
} from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	IProductFindFirstParams,
	IProductFindFirstQuery,
	IProductFindManyParams,
	IProductFindManyQuery,
	IProductFindOneParams,
	IProductFindOneQuery,
} from './interfaces/product-read.interfaces';
import { IProductQueryOne } from '../dto/interfaces/query-product.interface';

@Injectable()
export class ProductReadService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product
	) {}

	private queries(query: IProductQueryOne | undefined) {
		const includes = [];
		if (query?.includeAccount) includes.push({ model: Account });
		if (query?.includeOrderDetails) includes.push({ model: OrderDetails });
		return includes;
	}

	async findOne(
		params: IProductFindOneParams,
		query?: IProductFindOneQuery
	): Promise<Product | null> {
		if (query?.includeAccount) {
			const product = await this.productRepository.findOne({
				where: {
					code: params.productCode,
					AccountCode: params.accountCode,
				},
			});
			return product;
		}
		if (query?.includeOrderDetails) {
			const product = await this.productRepository
				.scope('WITH_ORDER_DETAILS')
				.findOne({
					where: {
						code: params.productCode,
						AccountCode: params.accountCode,
					},
				});
			return product;
		}
		const product = this.productRepository.findOne({
			where: {
				code: params.productCode,
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
			logging: console.debug,
		});
		return product;
	}

	async findOneByCode(productCode: string): Promise<Product | null> {
		return this.productRepository.findOne({
			where: {
				code: productCode,
			},
		});
	}

	async findAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<Product[] | null> {
		if (query?.includeAccount) {
			const products = this.productRepository.findAll({
				where: {
					AccountCode: params.accountCode,
				},
			});
			return products;
		}
		if (query?.includeOrderDetails) {
			const products = this.productRepository
				.scope('ONLY_WHERE_ORDER_DETAILS_EXIST')
				.findAll({
					where: {
						AccountCode: params.accountCode,
					},
				});
			return products;
		}
		if (query?.filteredByPrice) {
			console.log('yes');
			const products = this.productRepository
				.scope({ method: ['priceRange', 100, 1000] })
				.findAll({
					where: {
						AccountCode: params.accountCode,
					},
					logging: console.debug,
				});
			return products;
		}
		const products = this.productRepository.findAll({
			where: {
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
		});
		return products;
	}

	async findFirst(
		params: IProductFindFirstParams,
		query?: IProductFindFirstQuery
	): Promise<Product | null> {
		return this.productRepository.findOne({
			where: {
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
		});
	}

	async findAndCountAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<{ rows: Product[]; count: number }> {
		return this.productRepository.findAndCountAll({
			where: { AccountCode: params.accountCode },
			limit: query?.limit,
		});
	}

	async count(params: IProductFindManyParams): Promise<number> {
		return this.productRepository.count({
			where: { AccountCode: params.accountCode },
		});
	}
}
