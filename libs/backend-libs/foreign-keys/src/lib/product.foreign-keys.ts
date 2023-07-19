import { ConstraintRule } from './base/constraint-rule.enum';
import { DefaultBelongsToOptions, TableForeignKey } from './base/table-foreign-key';
import { PRODUCT_ALIAS, PRODUCT_CODE_ALIAS, PRODUCTS_ALIAS } from '@shared/constants';

export class ProductForeignKey extends TableForeignKey {
  static override readonly params: DefaultBelongsToOptions = {
      as: { plural: PRODUCT_ALIAS, singular: PRODUCTS_ALIAS },
      foreignKey: PRODUCT_CODE_ALIAS,
      onDelete: ConstraintRule.CASCADE,
      onUpdate: ConstraintRule.CASCADE,
  }
}