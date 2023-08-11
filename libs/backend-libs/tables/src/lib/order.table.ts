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
} from '@backend-demo/shared/constants';
import { Op } from 'sequelize';
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
import { Account } from './account.table';
import { OrderDetails } from './order-details.table';

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
}
