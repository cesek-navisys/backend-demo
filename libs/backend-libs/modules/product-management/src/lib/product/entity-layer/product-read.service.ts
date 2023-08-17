import { Product } from '@backend-demo/backend-libs/tables';
import { Inject, Injectable } from '@nestjs/common';
import {
	IProductFindFirstParams,
	IProductFindFirstQuery,
	IProductFindManyParams,
	IProductFindManyQuery,
	IProductFindOneParams,
	IProductFindOneQuery,
} from './interfaces/product-read.interfaces';

@Injectable()
export class ProductReadService {
	constructor(
		@Inject('PRODUCTS_REPOSITORY')
		private productRepository: typeof Product
	) {}

	async findOne(params: IProductFindOneParams, query?: IProductFindOneQuery) {
		if (query?.includeOrderDetails === true) {
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
		});
		return product;
	}

	async findOneByCode(productCode: string) {
		return this.productRepository.findOne({
			where: {
				code: productCode,
			},
		});
	}

	async findAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	) {
		let scopesToApply = [];

		if (query?.includeOrderDetails === true) {
			console.log(
				typeof query?.includeOrderDetails,
				query?.includeOrderDetails
			);
			scopesToApply.push('ONLY_WHERE_ORDER_DETAILS_EXIST');
		}

		if (query?.filteredByPrice === true) {
			console.log(typeof query?.filteredByPrice, query?.filteredByPrice);
			scopesToApply.push({ method: ['priceRange', 100, 1000] });
		}

		if (scopesToApply.length === 0) {
			return this.productRepository.findAll({
				where: {
					AccountCode: params.accountCode,
				},
			});
		}

		return this.productRepository.scope(...scopesToApply).findAll({
			where: {
				AccountCode: params.accountCode,
			},
		});
	}

	async findFirst(
		params: IProductFindFirstParams,
		query?: IProductFindFirstQuery
	) {
		if (query?.includeOrderDetails === true) {
			const product = this.productRepository
				.scope('WITH_ORDER_DETAILS')
				.findOne({
					where: {
						AccountCode: params.accountCode,
					},
				});
			return product;
		}
		return this.productRepository.findOne({
			where: {
				AccountCode: params.accountCode,
			},
		});
	}

	async findAndCountAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	) {
		if (query?.includeOrderDetails === true) {
			const products = this.productRepository
				.scope('ONLY_WHERE_ORDER_DETAILS_EXIST')
				.findAndCountAll({
					where: {
						AccountCode: params.accountCode,
					},
				});
			return products;
		}
		if (query?.filteredByPrice === true) {
			const products = this.productRepository
				.scope({ method: ['priceRange', 1000, 10000] })
				.findAndCountAll({
					where: {
						AccountCode: params.accountCode,
					},
				});
			return products;
		}
		return this.productRepository.findAndCountAll({
			where: { AccountCode: params.accountCode },
			limit: query?.limit,
		});
	}

	async count(params: IProductFindManyParams) {
		return this.productRepository.count({
			where: { AccountCode: params.accountCode },
		});
	}
}
