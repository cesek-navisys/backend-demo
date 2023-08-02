import {
	ACCOUNTS_ALIAS,
	ACCOUNT_ALIAS,
	ACCOUNT_CODE_ALIAS,
} from '@backend-demo/shared/constants';
import { ConstraintRule } from './base/constraint-rule.enum';
import {
	DefaultBelongsToOptions,
	TableForeignKey,
} from './base/table-foreign-key';

export class AccountForeignKey extends TableForeignKey {
	static override readonly params: DefaultBelongsToOptions = {
		as: { plural: ACCOUNTS_ALIAS, singular: ACCOUNT_ALIAS },
		foreignKey: ACCOUNT_CODE_ALIAS,
		onDelete: ConstraintRule.CASCADE,
		onUpdate: ConstraintRule.CASCADE,
	};
}
