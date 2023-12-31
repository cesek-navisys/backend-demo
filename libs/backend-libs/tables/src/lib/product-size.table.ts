import { Product } from './product.table';
import { ProductForeignKey } from '@backend-demo/backend-libs/foreign-keys';
import { ProductSizeName } from '@backend-demo/shared/enums';
import {
	IProductSizeAttributes,
	IProductSizeCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	PRODUCT_SIZE_TABLE_NAME_PLURAL,
	PRODUCT_SIZE_TABLE_NAME_SINGULAR,
} from '@backend-demo/shared/constants';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';

@Table({
	name: {
		plural: PRODUCT_SIZE_TABLE_NAME_PLURAL,
		singular: PRODUCT_SIZE_TABLE_NAME_SINGULAR,
	},
})
export class ProductSize
	extends Model<IProductSizeAttributes, IProductSizeCreationAttributes>
	implements IProductSizeAttributes
{
	@Column({
		allowNull: false,
		defaultValue: DataType.UUIDV4,
		primaryKey: true,
		type: DataType.UUID,
	})
	code!: string;

	@Column({
		allowNull: false,
		type: DataType.STRING,
	})
	name!: ProductSizeName;

	@Column({
		allowNull: false,
		type: DataType.INTEGER,
	})
	weight!: number;

	@ForeignKey(() => Product)
	@Column({
		allowNull: false,
		type: DataType.UUID,
	})
	ProductCode!: string;

	@BelongsTo(() => Product, ProductForeignKey.belongsTo())
	Product?: Product;
}
