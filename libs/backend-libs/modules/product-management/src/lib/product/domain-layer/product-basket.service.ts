import { Injectable } from '@nestjs/common';
import { ProductReadService } from '../entity-layer/product-read.service';
import { ProductWriteService } from '../entity-layer/product-write.service';
import { IProductConfirmParams } from './interfaces/product-basket.interface';

@Injectable()
export class ProductBasketService {
	constructor(
		private readonly productReadService: ProductReadService,
		private readonly productWriteService: ProductWriteService
	) {}
}
