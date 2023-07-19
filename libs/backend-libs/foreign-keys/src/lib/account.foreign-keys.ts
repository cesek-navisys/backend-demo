import { ACCOUNT_ALIAS, ACCOUNT_CODE_ALIAS } from '@shared/constants';
import { DefaultBelongsToOptions, TableForeignKey } from './base/table-foreign-key';
import { ConstraintRule } from './base/constraint-rule.enum';

export class AccountForeignKey extends TableForeignKey {
    static override readonly params: DefaultBelongsToOptions = {
        as: { plural: null, singular: ACCOUNT_ALIAS },
        foreignKey: ACCOUNT_CODE_ALIAS,
        onDelete: ConstraintRule.CASCADE,
        onUpdate: ConstraintRule.CASCADE,
    }
}
