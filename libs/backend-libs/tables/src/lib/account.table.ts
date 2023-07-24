import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from './order.table';
import { Product } from './product.table';
import {
	AccountForeignKey,
	OrderForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	IAccountAttributes,
	IAccountCreationAttributes,
} from '@backend-demo/backend-libs/entities';

@Table({ paranoid: true })
export class Account
	extends Model<IAccountAttributes, IAccountCreationAttributes>
	implements IAccountAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	name!: string;

	@Column({ type: DataType.STRING })
	surname!: string;

	@Column({ type: DataType.STRING })
	email!: string;

	@Column({ allowNull: true, type: DataType.STRING })
	phone!: string;

	@Column({ type: DataType.STRING })
	address!: string;

	@HasMany(() => Order, AccountForeignKey.hasMany(OrderForeignKey))
	Orders?: Order[];

	@HasMany(() => Product, AccountForeignKey.hasMany(ProductForeignKey))
	Products?: Product[];
}
