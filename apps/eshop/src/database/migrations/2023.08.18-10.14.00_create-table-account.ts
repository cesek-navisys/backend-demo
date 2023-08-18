import { Account } from '@backend-demo/backend-libs/tables';
import { ACCOUNT_TABLE_NAME_PLURAL } from '@backend-demo/shared/constants';
import { DataType } from 'sequelize-typescript';
import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.createTable<Account>(ACCOUNT_TABLE_NAME_PLURAL, {
			code: {
				allowNull: true,
				primaryKey: true,
				type: DataType.UUID,
			},
			name: {
				type: DataType.STRING,
				allowNull: false,
			},
			surname: {
				type: DataType.STRING,
				allowNull: false,
			},
			address: {
				type: DataType.STRING,
				allowNull: false,
			},
			email: {
				type: DataType.STRING,
				allowNull: false,
			},
			phone: {
				type: DataType.STRING,
				allowNull: true,
			},
			isActive: {
				type: DataType.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataType.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataType.DATE,
				allowNull: true,
			},
			deletedAt: {
				type: DataType.DATE,
				allowNull: true,
			},
		});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const down: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.dropTable({ tableName: ACCOUNT_TABLE_NAME_PLURAL });
};
