import { Injectable } from '@nestjs/common';
import { IProductCreate } from './dto/interfaces/create-product.interface';
import {
	IProductQueryMany,
	IProductQueryOne,
} from './dto/interfaces/query-product.interface';
import {
	IProductFindManyParams,
	IProductFindOneParams,
} from './entity-layer/interfaces/product-read.interfaces';
import { IProductDeleteParams } from './entity-layer/interfaces/product-waste.interfaces';
import {
	IProductCreateParams,
	IProductUpdateParams,
	IUpdateProduct,
} from './entity-layer/interfaces/product-write.interfaces';
import { ProductReadService } from './entity-layer/product-read.service';
import { ProductWasteService } from './entity-layer/product-waste.service';
import { ProductWriteService } from './entity-layer/product-write.service';
import { ProductBasketService } from './domain-layer/product-basket.service';

@Injectable()
export class ProductExternalService {
	constructor(
		private readonly productReadService: ProductReadService,
		private readonly productWasteService: ProductWasteService,
		private readonly productWriteService: ProductWriteService,
		private readonly productBasketService: ProductBasketService
	) {}

	async findOne(params: IProductFindOneParams, query?: IProductQueryOne) {
		const { productCode, accountCode } = params;
		return this.productReadService.findOne(
			{
				productCode,
				accountCode,
			},
			{ ...query }
		);
	}

	async findAll(params: IProductFindManyParams, query?: IProductQueryMany) {
		return this.productReadService.findAll(params, query);
	}

	async create(params: IProductCreateParams, createProduct: IProductCreate) {
		return this.productWriteService.createOne(params, createProduct);
	}

	async update(params: IProductUpdateParams, updateOrder: IUpdateProduct) {
		return this.productWriteService.updateOne(params, updateOrder);
	}

	async addToBasket(params: IProductUpdateParams) {
		return this.productBasketService.addToBasket(params);
	}

	async delete(params: IProductDeleteParams) {
		return this.productWasteService.delete(params);
	}
}
