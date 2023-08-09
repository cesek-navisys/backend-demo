import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
	FindAccountByCodeQuery,
<<<<<<< HEAD
	IFindAccountByCodeQuery,
=======
	FindProductByCodeQuery,
	IFindAccountByCodeQuery,
	IFindProductByCodeQuery,
>>>>>>> 10c2ed3b90c286a0dfb745085f0780cef6a6ff08
} from '@backend-demo/backend-libs/queries';

@Injectable()
export class OrderManagementQueryService {
	constructor(private readonly queryBus: QueryBus) {}

	async queryAccountByCode(params: IFindAccountByCodeQuery) {
		return this.queryBus.execute(new FindAccountByCodeQuery(params));
	}
<<<<<<< HEAD
=======

	async queryProductByCode(params: IFindProductByCodeQuery) {
		return this.queryBus.execute(new FindProductByCodeQuery(params));
	}
>>>>>>> 10c2ed3b90c286a0dfb745085f0780cef6a6ff08
}
