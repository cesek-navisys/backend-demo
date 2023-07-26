import {
	IProductQueryMany,
	IProductQueryOne,
} from './dto/interfaces/query-product.interface';
import {
	IProductFindFirstParams,
	IProductFindFirstQuery,
	IProductFindManyParams,
	IProductFindManyQuery,
} from './entity-layer/interfaces/product-read.interfaces';
import { IProductDeleteParams } from './entity-layer/interfaces/product-waste.interfaces';
import {
	IProductCreateOneParams,
	IProductUpdateOneParams,
	IProductUpsertOneParams,
} from './entity-layer/interfaces/product-write.interfaces';
import { ProductReadService } from './entity-layer/product-read.service';
import { ProductWasteService } from './entity-layer/product-waste.service';
import { ProductWriteService } from './entity-layer/product-write.service';

export class ProductExternalService {
	constructor(
		private readonly productReadService: ProductReadService,
		private readonly productWasteService: ProductWasteService,
		private readonly productWriteService: ProductWriteService
	) {}

	async findOne(productCode: string, query?: IProductQueryOne) {
		return this.productReadService.findOne({ code: productCode }, query);
	}

	async findAll(params: IProductFindManyParams, query?: IProductQueryMany) {
		return await this.productReadService.findAll(params, query);
	}

	async findFirst(
		params: IProductFindFirstParams,
		query?: IProductFindFirstQuery
	) {
		return await this.productReadService.findFirst(params, query);
	}

	async findAndCountAll(
		params: IProductFindManyParams,
		query?: IProductFindManyQuery
	) {
		return await this.productReadService.findAndCountAll(params, query);
	}

	async createOne(params: IProductCreateOneParams) {
		return await this.productWriteService.createOne(params);
	}

	async upsertOne(params: IProductUpsertOneParams) {
		return await this.productWriteService.upsertOne(params);
	}

	async updateOne(productCode: string, params: IProductUpdateOneParams) {
		return await this.productWriteService.updateOne(productCode, params);
	}

	async delete(productCode: string) {
		return await this.productWasteService.delete(productCode);
	}

	async restore(productCode: string) {
		return await this.productWasteService.restore(productCode);
	}
}
