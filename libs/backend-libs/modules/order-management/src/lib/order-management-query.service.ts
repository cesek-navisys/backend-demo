import {
	FindProductByCodeQuery,
	IFindProductByCodeQuery,
} from '@backend-demo/backend-libs/queries';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class OrderManagementQueryService {
	constructor(private readonly queryBus: QueryBus) {}

	async queryProductByCode(params: IFindProductByCodeQuery) {
		return this.queryBus.execute(new FindProductByCodeQuery(params));
	}
}
