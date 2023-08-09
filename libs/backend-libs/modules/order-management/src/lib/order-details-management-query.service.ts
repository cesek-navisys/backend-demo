import {
	FindAccountCodeByProductCodeQuery,
	FindProductByCodeQuery,
	IFindProductByCodeQuery,
} from '@backend-demo/backend-libs/queries';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class OrderDetailsManagementQueryService {
	constructor(private readonly queryBus: QueryBus) {}

	async queryFindOneAccountProduct(params: IFindProductByCodeQuery) {
		return this.queryBus.execute(new FindProductByCodeQuery(params));
	}

	async queryFindAccountCodeByProduct(productCode: string) {
		return this.queryBus.execute(
			new FindAccountCodeByProductCodeQuery(productCode)
		);
	}
}
