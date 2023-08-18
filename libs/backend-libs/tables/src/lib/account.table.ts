import { Order } from './order.table';
import { Product } from './product.table';
import {
	IAccountAttributes,
	IAccountCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	AccountForeignKey,
	OrderForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	ACCOUNT_TABLE_NAME_PLURAL,
	ACCOUNT_TABLE_NAME_SINGULAR,
	ORDERS_ALIAS,
	PRODUCTS_ALIAS,
} from '@backend-demo/shared/constants';
import {
	Column,
	DataType,
	HasMany,
	Model,
	Scopes,
	Table,
} from 'sequelize-typescript';

@Scopes(() => ({
	WITH_ORDERS: {
		include: [
			{
				model: Order,
				as: ORDERS_ALIAS,
				required: true,
			},
		],
	},
	WITH_PRODUCTS: {
		include: [
			{
				model: Product,
				as: PRODUCTS_ALIAS,
				required: true,
			},
		],
	},
	showActiveOnly: () => ({
		where: {
			isActive: true,
		},
	}),
	showInactiveOnly: () => ({
		where: {
			isActive: false,
		},
	}),
}))
@Table({
	name: {
		plural: ACCOUNT_TABLE_NAME_PLURAL,
		singular: ACCOUNT_TABLE_NAME_SINGULAR,
	},
})
export class Account
	extends Model<IAccountAttributes, IAccountCreationAttributes>
	implements IAccountAttributes
{
	@Column({
		allowNull: false,
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	name!: string;

	@Column({ type: DataType.STRING })
	surname!: string;

	@Column({ type: DataType.STRING, unique: true })
	email!: string;

	@Column({ allowNull: true, type: DataType.STRING, unique: true })
	phone!: string;

	@Column({ type: DataType.STRING })
	address!: string;

	@Column({ type: DataType.BOOLEAN })
	isActive!: boolean;

	@HasMany(() => Order, AccountForeignKey.hasMany(OrderForeignKey))
	Orders?: Order[];

	@HasMany(() => Product, AccountForeignKey.hasMany(ProductForeignKey))
	Products?: Product[];
}
