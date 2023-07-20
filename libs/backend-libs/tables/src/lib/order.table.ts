import {
	IAccountAttributes,
	IOrderAttributes,
	IOrderCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	AccountForeignKey,
	OrderDetailsForeignKey,
	OrderForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import { OrderDetails } from './order-details.table';
import { Account } from './account.table';

@Table
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes
{
	@Column({
		allowNull: false,
		type: DataType.UUID,
		primaryKey: true,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	messageForOwner!: string;

	@ForeignKey(() => Account)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	AccountCode!: string;

	@BelongsTo(() => Account, AccountForeignKey.belongsTo())
	Account?: IAccountAttributes;

	@HasMany(
		() => OrderDetails,
		OrderForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];
}
