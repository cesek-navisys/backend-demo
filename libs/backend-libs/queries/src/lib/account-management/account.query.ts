import { Account } from '@backend-demo/backend-libs/tables';
import { Query } from '@nestjs-architects/typed-cqrs';
export interface IFindAccountByCodeQuery {
	accountCode: string;
}

export class FindAccountByCodeQuery extends Query<Account> {
	constructor(public readonly params: IFindAccountByCodeQuery) {
		super();
	}
}
