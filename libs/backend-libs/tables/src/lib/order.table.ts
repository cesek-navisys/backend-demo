import { Account } from './account.table';
import { OrderDetails } from './order-details.table';
import {
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

@Table({ paranoid: true })
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

	@Column({
		allowNull: false,
		defaultValue: false,
		type: DataType.BOOLEAN,
	})
	confirmed!: boolean;

	@ForeignKey(() => Account)
	@Column({
		allowNull: true,
		type: DataType.UUID,
	})
	AccountCode!: string | null;

	@HasMany(
		() => OrderDetails,
		OrderForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];

	@BelongsTo(() => Account, AccountForeignKey.belongsTo())
	Account?: Account;

	// TODO: ne víc než 2 košíky na account. Pomocí unique indexes (sequelize)
}
