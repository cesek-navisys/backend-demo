import { Account } from './account.table';
import { Color } from '@shared/enums';
import { OrderDetails } from './order-details.table';
import {
	IProductAttributes,
	IProductCreationAttributes,
} from '@backend-libs/entities';
import {
	AccountForeignKey,
	OrderDetailsForeignKey,
	ProductForeignKey,
} from '@backend-libs/foreign-keys';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';

@Table
export class Product
	extends Model<IProductAttributes, IProductCreationAttributes>
	implements IProductAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
		primaryKey: true,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	name!: string;

	@Column({ type: DataType.STRING })
	description!: string;

	@Column({ type: DataType.STRING })
	price!: number;

	@Column({
		allowNull: false,
		type: DataType.STRING,
	})
	color!: Color;

	@ForeignKey(() => Account)
	@Column({
		allowNull: false,
		type: DataType.UUID,
	})
	OwnerCode!: string;

	@HasMany(
		() => OrderDetails,
		ProductForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];

	@BelongsTo(() => Account, ProductForeignKey.belongsTo(AccountForeignKey))
	Owner?: Account;
}
