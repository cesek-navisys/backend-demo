import { Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import {
	IOrderAttributes,
	IOrderDetailsAttributes,
	IOrderDetailsCreationAttributes,
	IProductAttributes,
} from '@shared/data/entities';

// HOMEWORK: Co je singleton class?
export class OrderDetails
	extends Model<IOrderDetailsAttributes, IOrderDetailsCreationAttributes>
	implements IOrderDetailsAttributes
{
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
	})
	code!: string;

	@Column({
		type: DataType.NUMBER,
		allowNull: false,
	})
	quantity!: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	canBeDeliveredSeparately!: boolean;

	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	OrderCode?: string;

	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	ProductCode?: string;
}
