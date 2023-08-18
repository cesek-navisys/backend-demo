import { Account, Order } from '@backend-demo/backend-libs/tables';
import { ConstraintRule } from '@backend-demo/backend-libs/foreign-keys';
import { DataType } from 'sequelize-typescript';
import {
	ACCOUNT_TABLE_NAME_PLURAL,
	ORDER_TABLE_NAME_PLURAL,
} from '@backend-demo/shared/constants';
import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.createTable<Order>(ORDER_TABLE_NAME_PLURAL, {
			code: {
				allowNull: true,
				primaryKey: true,
				type: DataType.UUID,
			},
			messageForOwner: {
				type: DataType.STRING,
				allowNull: true,
			},
			confirmed: {
				type: DataType.BOOLEAN,
				allowNull: false,
			},
			AccountCode: {
				type: DataType.UUID,
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
	await sequelize.getQueryInterface().addConstraint(ORDER_TABLE_NAME_PLURAL, {
		fields: ['AccountCode'] as Array<keyof Order> as string[],
		onDelete: ConstraintRule.CASCADE,
		onUpdate: ConstraintRule.CASCADE,
		type: 'foreign key',
		references: {
			field: 'code' as keyof Account,
			table: ACCOUNT_TABLE_NAME_PLURAL,
		},
	});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const down: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.dropTable({ tableName: ORDER_TABLE_NAME_PLURAL });
};
