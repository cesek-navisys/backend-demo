import { AccountReadService } from '../entity-layer';
import { FindAccountByCodeQuery } from '@backend-demo/backend-libs/queries';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindAccountByCodeQuery)
export class QueryFindAccountByCodeHandler
	implements IQueryHandler<FindAccountByCodeQuery>
{
	constructor(private readonly accountReadService: AccountReadService) {}
	async execute(query: FindAccountByCodeQuery) {
		const { params } = query;
		const { accountCode } = params;
		return this.accountReadService.findOne({ code: accountCode });
	}
}
