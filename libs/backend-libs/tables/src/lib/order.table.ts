import { Account } from './account.table';
import { Op } from 'sequelize';
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
	ACCOUNT_ALIAS,
	ORDER_DETAILS_ALIAS,
	ORDER_TABLE_NAME_PLURAL,
	ORDER_TABLE_NAME_SINGULAR,
} from '@backend-demo/shared/constants';
import {
	BelongsTo,
	Column,
	DataType,
	DefaultScope,
	ForeignKey,
	HasMany,
	Model,
	Scopes,
	Sequelize,
	Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({
	include: [
		{
			model: OrderDetails,
			as: ORDER_DETAILS_ALIAS,
			required: false,
		},
	],
}))
@Scopes(() => ({
	WITH_ACCOUNT: {
		include: [
			{
				model: Account,
				as: ACCOUNT_ALIAS,
			},
		],
	},
	ONLY_WHERE_ORDER_DETAILS_EXIST: {
		where: {
			[Op.and]: Sequelize.literal(
				'EXISTS (SELECT od.code FROM public."OrderDetails" AS od WHERE od."OrderCode" = "Order".code LIMIT 1)'
			),
		},
	},
	onlyWhenProductPriceHigherThan: (price: number) => {
		return {
			where: {
				[Op.and]: Sequelize.literal(
					`(SELECT SUM(od."totalPrice") FROM public."OrderDetails" AS od WHERE od."OrderCode" = "Order".code) > ${price}`
				),
			},
		};
	},
}))
@Table({
	name: {
		plural: ORDER_TABLE_NAME_PLURAL,
		singular: ORDER_TABLE_NAME_SINGULAR,
	},
})
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes
{
	@Column({
		allowNull: false,
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
}
