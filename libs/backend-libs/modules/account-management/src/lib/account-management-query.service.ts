import { FindFirstAccountProductQuery, FindProductByCodeQuery, IFindProductByCodeQuery } from '@backend-demo/backend-libs/queries';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class AccountManagementQueryService {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    async queryProductByCode(params: IFindProductByCodeQuery) {
        return this.queryBus.execute(
            new FindProductByCodeQuery(params)
        )
    }

    async queryFirstAccountProduct(accountCode: string) {
        return this.queryBus.execute(
            new FindFirstAccountProductQuery(accountCode)
        )
    }

}