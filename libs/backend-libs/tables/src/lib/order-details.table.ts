import {
	IOrderDetailsAttributes,
	IOrderDetailsCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	OrderDetailsForeignKey,
	OrderForeignKey,
	ProductForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { Order } from './order.table';
import { Product } from './product.table';

@Table
export class OrderDetails
	extends Model<IOrderDetailsAttributes, IOrderDetailsCreationAttributes>
	implements IOrderDetailsAttributes {
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
	})
	code!: string;

	@Column({
		type: DataType.DECIMAL,
		allowNull: false,
	})
	quantity!: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	canBeDeliveredSeparately!: boolean;

	@ForeignKey(() => Order)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	OrderCode!: string;

	@ForeignKey(() => Product)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	ProductCode!: string;

	@BelongsTo(() => Order, OrderForeignKey.belongsTo())
	Order?: Order;

	@BelongsTo(() => Product, ProductForeignKey.belongsTo())
	Product?: Product;
}
