import {
	IOrderAttributes,
	IOrderCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	OrderDetailsForeignKey,
	OrderForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderDetails } from './order-details..table';

@Table
export class Order
	extends Model<IOrderAttributes, IOrderCreationAttributes>
	implements IOrderAttributes
{
	@Column({
		allowNull: true,
		type: DataType.UUID,
		primaryKey: true,
	})
	code!: string;

	@Column({ type: DataType.STRING })
	messageForOwner!: string;

	@HasMany(
		() => OrderDetails,
		OrderForeignKey.hasMany(OrderDetailsForeignKey)
	)
	OrderDetails?: OrderDetails[];
}
