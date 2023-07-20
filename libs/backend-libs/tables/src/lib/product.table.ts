import {
	IProductAttributes,
	IProductCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	AccountForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import { Color } from '@backend-demo/shared/enums';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Account } from './account.table';

@Table
export class Product
	extends Model<IProductAttributes, IProductCreationAttributes>
	implements IProductAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	name!: string;

	@Column({ type: DataType.STRING })
	description!: string;

	@Column({ type: DataType.FLOAT })
	price!: number;

	@Column({ type: DataType.ENUM })
	color!: Color | null;

	@ForeignKey(() => Account)
	@Column({ type: DataType.UUID })
	OwnerCode!: string;

	@BelongsTo(() => Account, AccountForeignKey.belongsTo())
	Owner?: Account;
}
