/**
 * classes implementing IAccountQueryOne and IAccountQueryMany
 */

import { IAccountQueryOne, IAccountQueryMany } from './interfaces/query-account.interface';

export class QueryOneAccountDto implements IAccountQueryOne {}

export class QueryManyAccountDto implements IAccountQueryMany {}
