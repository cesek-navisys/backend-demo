import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
	FindAccountByCodeQuery,
	IFindAccountByCodeQuery,
} from '@backend-demo/backend-libs/queries';

@Injectable()
export class OrderManagementQueryService {
	constructor(private readonly queryBus: QueryBus) {}

	async queryAccountByCode(params: IFindAccountByCodeQuery) {
		return this.queryBus.execute(new FindAccountByCodeQuery(params));
	}
}
