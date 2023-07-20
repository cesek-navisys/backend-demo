import { ConstraintRule } from './base/constraint-rule.enum';
<<<<<<< HEAD
import {
	DefaultBelongsToOptions,
	TableForeignKey,
} from './base/table-foreign-key';
import {
	PRODUCTS_ALIAS,
	PRODUCT_ALIAS,
	PRODUCT_CODE_ALIAS,
} from '@backend-demo/shared/constants';

export class ProductForeignKey extends TableForeignKey {
	static override readonly params: DefaultBelongsToOptions = {
		as: { plural: PRODUCTS_ALIAS, singular: PRODUCT_ALIAS },
		foreignKey: PRODUCT_CODE_ALIAS,
		onDelete: ConstraintRule.CASCADE,
		onUpdate: ConstraintRule.CASCADE,
	};
}
=======
import { DefaultBelongsToOptions, TableForeignKey } from './base/table-foreign-key';
import { PRODUCT_ALIAS, PRODUCT_CODE_ALIAS, PRODUCTS_ALIAS } from '@backend-demo/shared/constants';

export class ProductForeignKey extends TableForeignKey {
  static override readonly params: DefaultBelongsToOptions = {
    as: { plural: PRODUCTS_ALIAS, singular: PRODUCT_ALIAS },
    foreignKey: PRODUCT_CODE_ALIAS,
    onDelete: ConstraintRule.CASCADE,
    onUpdate: ConstraintRule.CASCADE,
  }
}
>>>>>>> upstream/main
