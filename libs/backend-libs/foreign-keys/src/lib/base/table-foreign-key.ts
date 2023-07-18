import type {
    BelongsToManyOptions,
    BelongsToOptions,
    HasManyOptions,
    HasOneOptions,
} from 'sequelize';
import { Mandatory } from '@shared/type-helpers';
import { ConstraintRule } from './constraint-rule.enum';

export const FOREIGN_KEY_ALIAS = 'fkey';

interface NameForm {
    /**
     * `null` is used to avoid using this form
     */
    singular: string | null;
    /**
     * `null` is used to avoid using this form
     */
    plural: string | null;
}

interface TableForeignKeyGetters
    extends Pick<BelongsToOptions, 'foreignKey' | 'onDelete' | 'onUpdate'>,
    NameForm {
    as: NameForm;
}

interface BelongsToBaseMandatoryOptions
    extends Mandatory<
        Omit<BelongsToOptions, 'as' | 'foreignKeyConstraint'>,
        'foreignKey'
    > {
    as: NameForm;
}

interface NoConstraintRules {
    constraints: false;
}
interface ConstraintRules {
    onDelete: ConstraintRule;
    onUpdate: ConstraintRule;
}

type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

type SelectConstraintRules =
    | NoConstraintRules
    | RequireAtLeastOne<ConstraintRules>;

function isNoConstraints(obj: SelectConstraintRules): obj is NoConstraintRules {
    return 'constraints' in obj && obj.constraints === false;
}

export interface DefaultBelongsToOptions
    extends Omit<
        BelongsToBaseMandatoryOptions,
        'constraints' | 'onDelete' | 'onUpdate'
    >,
    ConstraintRules { }

interface CustomBelongsToManyOptions
    extends Pick<
        BelongsToManyOptions,
        'foreignKey' | 'otherKey' | 'sourceKey' | 'targetKey'
    > {
    rules?: SelectConstraintRules;
}

interface BaseHasOptions {
    useTargetForeignKey?: boolean;
}

interface CustomHasOneOptions
    extends BaseHasOptions,
    Pick<HasOneOptions, 'sourceKey'> {
    rules?: SelectConstraintRules;
}

interface CustomHasManyOptions
    extends BaseHasOptions,
    Pick<HasManyOptions, 'sourceKey'> {
    rules?: SelectConstraintRules;
}

export class TableForeignKey {
    protected static params: DefaultBelongsToOptions;

    static get as() {
        if (!this.params.as)
            throw new Error(`Missing 'as' of the '${this.name}' foreign key.`);
        return this.params.as;
    }
    static get singular() {
        if (!this.as.singular)
            throw new Error(
                `Missing 'singular' form of the '${this.name}' foreign key.`,
            );
        return this.as.singular;
    }

    static get plural() {
        if (!this.as.plural)
            throw new Error(
                `Missing 'plural' form of the '${this.name}' foreign key.`,
            );
        return this.as.plural;
    }

    static get foreignKey() {
        const output =
            typeof this.params.foreignKey === 'string'
                ? this.params.foreignKey
                : this.params.foreignKey.name;
        if (!output)
            throw new Error(
                `Missing the 'key name' of the '${this.name}' foreign key.`,
            );
        return output;
    }
    static get onDelete() {
        return this.params.onDelete;
    }
    static get onUpdate() {
        return this.params.onUpdate;
    }

    /**
     *
     * @param prefix string or `TableForeignKey` (plural form will be used)
     * @returns constraint name in specified format. Example: `Prefix_ForeignKey_{FOREIGN_KEY_ALIAS}`
     */
    static constraintName<T extends TableForeignKey & TableForeignKeyGetters>(
        prefix: T | string,
    ) {
        return `${typeof prefix === 'string' ? prefix : prefix.plural}_${this.foreignKey
            }_${FOREIGN_KEY_ALIAS}`;
    }

    /**
     * unlike the `has` methods `belongsTo` method belongs to the `target model` in which the foreignKey is located
     * @param options disable constraints or select at least one custom rule
     * @returns `BelongsToOptions` to be used in `@BelongsTo` decorator
     */
    static belongsTo(options?: SelectConstraintRules) {
        const result = {
            ...this.params,
            as: this.singular,
        } as BelongsToOptions;
        if (options) {
            if (isNoConstraints(options)) {
                result.constraints = false;
                if (result.onDelete) delete result.onDelete;
                if (result.onUpdate) delete result.onUpdate;
            } else {
                result.constraints = true;
                result.onDelete = options.onDelete;
                result.onUpdate = options.onUpdate;
            }
        }
        return result;
    }

    /**
     * @returns `BelongsToManyOptions` to be spread in `@BelongsToMany` decorator BEFORE the through
     */
    static belongsToManyWithoutThrough<
        S extends TableForeignKey & TableForeignKeyGetters,
    >(distant: S, options?: CustomBelongsToManyOptions) {
        const result = {
            ...this.params,
            as: this.plural,
            foreignKey: options?.foreignKey ?? distant.foreignKey,
            otherKey: options?.otherKey || this.foreignKey,
        } as Omit<BelongsToManyOptions, 'through'>;
        if (options?.sourceKey) result.sourceKey = options.sourceKey;
        if (options?.targetKey) result.targetKey = options.targetKey;
        if (options?.rules) {
            if (isNoConstraints(options.rules)) {
                result.constraints = false;
            } else {
                result.constraints = true;
                if (options.rules.onDelete)
                    result.onDelete = options.rules.onDelete;
                if (options.rules.onUpdate)
                    result.onUpdate = options.rules.onUpdate;
            }
        }
        return result;
    }

    /**
     * unlike the `belongsTo` method the `hasOne` method belongs to the `source model` and uses the target model as a parameter
     * @param target ForeignTableTable class where the one row is stored
     * @returns `HasOneOptions` to be used in `@HasOne` decorator
     */
    static hasOne<T extends TableForeignKey & TableForeignKeyGetters>(
        target: T,
        options?: CustomHasOneOptions,
    ) {
        const result = {
            as: target.as.singular,
            constraints: false,
        } as HasOneOptions;
        if (options?.useTargetForeignKey) result.foreignKey = target.foreignKey;
        if (options?.sourceKey) result.sourceKey = options.sourceKey;
        if (options?.rules) {
            if (!isNoConstraints(options?.rules)) {
                result.constraints = true;
                result.onDelete = options.rules.onDelete ?? this.onDelete;
                result.onUpdate = options.rules.onUpdate ?? this.onUpdate;
            }
        }
        return result;
    }

    /**
     * unlike the `belongsTo` method the `hasMany` method belongs to the `source model` and uses the target model as a parameter
     * @param target ForeignTableTable class where the many rows are stored
     * @returns `HasManyOptions` to be used in `@HasMany` decorator
     */
    static hasMany<T extends TableForeignKey & TableForeignKeyGetters>(
        target: T,
        options?: CustomHasManyOptions,
    ) {
        const result = {
            as: target.as.plural,
            constraints: false,
        } as HasManyOptions;
        if (options?.useTargetForeignKey) result.foreignKey = target.foreignKey;
        if (options?.sourceKey) result.sourceKey = options.sourceKey;
        if (options?.rules) {
            if (!isNoConstraints(options.rules)) {
                result.constraints = true;
                result.onDelete = options.rules.onDelete ?? this.onDelete;
                result.onUpdate = options.rules.onUpdate ?? this.onUpdate;
            }
        }
        return result;
    }
}
