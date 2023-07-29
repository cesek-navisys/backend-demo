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
		const queries = [];
		if (query?.includeAccount) queries.push({ model: Account });
		if (query?.includeOrderDetails) queries.push({ model: OrderDetails });
		return queries;
	}

	async findOne(
		params: IProductFindOneParams,
		query?: IProductFindOneQuery
	): Promise<Product | null> {
		return this.productRepository.findOne<Product>({
			where: {
				code: params.productCode,
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
		});
	}

	async findAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<Product[] | null> {
		return this.productRepository.findAll<Product>({
			where: {
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
		});
	}

	async findFirst(
		params: IProductFindFirstParams,
		query?: IProductFindFirstQuery
	): Promise<Product | null> {
		return this.productRepository.findOne<Product>({
			where: {
				code: params.productCode,
				AccountCode: params.accountCode,
			},
			include: this.queries(query),
		});
	}

	async findAndCountAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<{ rows: Product[]; count: number }> {
		return this.productRepository.findAndCountAll<Product>({
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
