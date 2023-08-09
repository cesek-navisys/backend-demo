import {
	FindAccountCodeByProductCodeQuery,
	FindFirstAccountProductQuery,
	FindProductByCodeQuery,
} from '@backend-demo/backend-libs/queries';
import { ProductReadService } from '../entity-layer/product-read.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindProductByCodeQuery)
export class QueryFindProductByCodeHandler
	implements IQueryHandler<FindProductByCodeQuery>
{
	constructor(private readonly productReadService: ProductReadService) {}
	async execute(query: FindProductByCodeQuery) {
		const { params } = query;
		const { accountCode, productCode } = params;
		return this.productReadService.findOne({ productCode, accountCode });
	}
}

@QueryHandler(FindFirstAccountProductQuery)
export class QueryFindFirstProductHandler
	implements IQueryHandler<FindFirstAccountProductQuery>
{
	constructor(private readonly productReadService: ProductReadService) {}
	async execute(query: FindFirstAccountProductQuery) {
		const { accountCode } = query;
		return this.productReadService.findFirst({ accountCode });
	}
}

@QueryHandler(FindAccountCodeByProductCodeQuery)
export class QueryFindAccountCodeByProductCodeHandler
	implements IQueryHandler<FindAccountCodeByProductCodeQuery>
{
	constructor(private readonly productREadService: ProductReadService) {}

	async execute(query: FindAccountCodeByProductCodeQuery) {
		const { productCode } = query;

		const product = await this.productREadService.findOneByCode(
			productCode
		);
		return product!.AccountCode;
	}
}
