import {
	IOrderAttributes,
	IOrderCreationAttributes
} from '@backend-libs/entities';
import {
	AccountForeignKey,
	OrderDetailsForeignKey,
	OrderForeignKey,
} from '@backend-libs/foreign-keys';
import { } from '@backend-libs/tables';
import {
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
	BelongsTo,
} from 'sequelize-typescript';
import { OrderDetails } from './order-details.table';
import { Account } from './account.table';

@Table
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes {
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
