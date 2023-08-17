import { Account } from './account.table';
import { Color } from '@backend-demo/shared/enums';
import { OrderDetails } from './order-details.table';
import {
	IProductAttributes,
	IProductCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	AccountForeignKey,
	OrderDetailsForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
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
import {
	ACCOUNT_ALIAS,
	ORDER_DETAILS_ALIAS,
	PRODUCTS_ALIAS,
	PRODUCT_TABLE_NAME_PLURAL,
} from '@backend-demo/shared/constants';
import { Op } from 'sequelize';

@DefaultScope(() => ({
	include: [
		{
			model: Account,
			as: ACCOUNT_ALIAS,
			required: true,
		},
	],
}))
@Scopes(() => ({
	WITH_ORDER_DETAILS: {
		include: [
			{
				model: OrderDetails,
				as: ORDER_DETAILS_ALIAS,
				required: true,
			},
		],
	},
	ONLY_WHERE_ORDER_DETAILS_EXIST: {
		where: {
			[Op.and]: Sequelize.literal(
				'EXISTS (SELECT od.code FROM public."OrderDetails" AS od WHERE od."ProductCode" = "Product".code LIMIT 1)'
			),
		},
	},
	priceRange: (minPrice: number, maxPrice: number) => ({
		where: {
			price: {
				[Op.between]: [minPrice, maxPrice],
			},
		},
	}),
}))
@Table({ name: { plural: PRODUCT_TABLE_NAME_PLURAL } })
export class Product
	extends Model<IProductAttributes, IProductCreationAttributes>
	implements IProductAttributes {
	@Column({
		allowNull: true,
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
		type: DataType.UUID,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	name!: string;

	@Column({ type: DataType.STRING })
	description!: string;

	@Column({ type: DataType.DOUBLE })
	price!: number;

	@Column({
		allowNull: true,
		type: DataType.STRING,
	})
	color!: Color;

	@ForeignKey(() => Account)
	@Column({
		allowNull: false,
		type: DataType.UUID,
	})
	AccountCode!: string;

	@HasMany(
		() => OrderDetails,
		ProductForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];

	@BelongsTo(() => Account, AccountForeignKey.belongsTo())
	Account?: Account;
}
