import { Account } from './account.table';
import { OrderDetails } from './order-details.table';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import {
	IOrderAttributes,
	IOrderCreationAttributes,
} from '@backend-libs/entities';
import {
	OrderForeignKey,
	AccountForeignKey,
	OrderDetailsForeignKey,
} from '@backend-libs/foreign-keys';

@Table
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
		primaryKey: true,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	messageForOwner!: string;

	@ForeignKey(() => Account)
	@Column({
		allowNull: false,
		type: DataType.UUID,
	})
	OwnerCode!: string;

	@HasMany(
		() => OrderDetails,
		OrderForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];

	@BelongsTo(() => Account, OrderForeignKey.belongsTo(AccountForeignKey))
	Owner?: Account;
}
