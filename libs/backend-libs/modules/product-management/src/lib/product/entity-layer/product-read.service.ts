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
		if (query?.includeOrderDetails) queries.push(OrderDetails);
		if (query?.includeOwner) queries.push(Account);
		return queries;
	}

	async findOne(
		params: IProductFindOneParams,
		query?: IProductFindOneQuery
	): Promise<Product | null> {
		return await this.productRepository.findOne<Product>({
			where: { code: params.code },
			include: this.queries(query),
		});
	}

	async findAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<Product[] | null> {
		return await this.productRepository.findAll<Product>({
			where: { OwnerCode: params.OwnerCode },
			limit: query?.limit,
		});
	}

	async findFirst(
		params: IProductFindFirstParams,
		query?: IProductFindFirstQuery
	): Promise<Product | null> {
		return await this.productRepository.findOne({
			where: {
				code: params.code,
				OwnerCode: params.OwnerCode,
				name: params.name,
			},
			include: this.queries(query),
		});
	}

	async findAndCountAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	): Promise<{ rows: Product[]; count: number }> {
		return await this.productRepository.findAndCountAll<Product>({
			where: { OwnerCode: params.OwnerCode },
			limit: query?.limit,
		});
	}

	async count(params: IProductFindManyParams): Promise<number> {
		return await this.productRepository.count({
			where: { OwnerCode: params.OwnerCode },
		});
	}
}
