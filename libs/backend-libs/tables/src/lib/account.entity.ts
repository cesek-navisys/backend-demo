import {
	IAccountAttributes,
	IAccountCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
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
}
