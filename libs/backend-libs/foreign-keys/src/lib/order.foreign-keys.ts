import { ConstraintRule } from './base/constraint-rule.enum';
import {
	DefaultBelongsToOptions,
	TableForeignKey,
} from './base/table-foreign-key';
import {
	ORDERS_ALIAS,
	ORDER_ALIAS,
	ORDER_CODE_ALIAS,
} from '@backend-demo/shared/constants';

export class OrderForeignKey extends TableForeignKey {
	static override readonly params: DefaultBelongsToOptions = {
		as: { plural: ORDERS_ALIAS, singular: ORDER_ALIAS },
		foreignKey: ORDER_CODE_ALIAS,
		onDelete: ConstraintRule.CASCADE,
		onUpdate: ConstraintRule.CASCADE,
	};
}
