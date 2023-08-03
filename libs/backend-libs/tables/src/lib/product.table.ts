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
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';

@Table({ paranoid: true })
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
		allowNull: false,
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
