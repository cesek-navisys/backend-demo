import { Account } from './account.table';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Scopes,
	Sequelize,
	Table
	} from 'sequelize-typescript';
import { Op, WhereOptions } from 'sequelize';
import { ORDER_DETAILS_ALIAS } from '@backend-demo/shared/constants';
import { OrderDetails } from './order-details.table';
import {
	IOrderAttributes,
	IOrderCreationAttributes,
	IOrderDetailsAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	AccountForeignKey,
	OrderDetailsForeignKey,
	OrderForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';

// @DefaultScope(() => ({where: {}}))
@Scopes(() => ({
	ONLY_WHERE_ORDER_DETAILS_EXIST: {
		where: {
			[Op.and]: Sequelize.literal(
				'EXISTS (select od.code from public."OrderDetails" as od where od."OrderCode" = "Order".code limit 1)'
			),
		},
	},
	WITH_ORDER_DETAILS: {
		include: [
			{
				model: OrderDetails,
				as: ORDER_DETAILS_ALIAS,
				where: {
					quantity: { [Op.gt]: 2 },
				} as WhereOptions<IOrderDetailsAttributes>,
				required: false,
			},
		],
	},
}))
@Table({ paranoid: true })
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
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
		allowNull: false,
		type: DataType.UUID,
	})
	AccountCode!: string;

	@HasMany(
		() => OrderDetails,
		OrderForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];

	@BelongsTo(() => Account, AccountForeignKey.belongsTo())
	Account?: Account;

	// TODO: ne víc než 2 košíky na account. Pomocí unique indexes (sequelize)
}
