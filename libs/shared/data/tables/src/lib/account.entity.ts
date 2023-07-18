import {
	IAccountAttributes,
	IAccountCreationAttributes,
} from '@shared/data/entities';
import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.table';
import { OrderForeignKey } from '@backend-libs/foreign-keys';

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
}
