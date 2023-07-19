import {
	IAccountAttributes,
	IAccountCreationAttributes,
} from '@backend-libs/entities';
import { 
	AccountForeignKey, 
	OrderForeignKey,
	ProductForeignKey, 
} from '@backend-libs/foreign-keys';
import { 
	Column, 
	DataType, 
	HasMany, 
	Model, 
	Table 
} from 'sequelize-typescript';
import { Product } from './product.table';
import { Order } from './order.table';


@Table
export class Account
	extends Model<IAccountAttributes, IAccountCreationAttributes>
	implements IAccountAttributes {
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

	@HasMany(
		() => Order, 
		AccountForeignKey.hasMany(OrderForeignKey)
	)
	Orders?: Order[];

	@HasMany(
		() => Product,
		AccountForeignKey.hasMany(ProductForeignKey)
	)
	Products?: Product[];
}
