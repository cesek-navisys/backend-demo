import { Query } from '@nestjs-architects/typed-cqrs';
import { Product } from '@backend-demo/backend-libs/tables';
export interface IFindProductByCodeQuery {
    productCode: string;
    accountCode: string;
}

export class FindProductByCodeQuery extends Query<Product> {
    constructor(public readonly params: IFindProductByCodeQuery) {
        super();
    }
}

export class FindFirstAccountProductQuery extends Query<Product> {
    constructor(public readonly accountCode: string) {
        super();
    }
}
