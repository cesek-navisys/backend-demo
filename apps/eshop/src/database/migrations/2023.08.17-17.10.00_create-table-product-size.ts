// migrations/00_initial.js

import { DataType } from 'sequelize-typescript';
import type { Migration } from '../umzug';
import { Product, ProductSize } from '@backend-demo/backend-libs/tables';
import {
	PRODUCT_SIZE_TABLE_NAME_PLURAL,
	PRODUCT_TABLE_NAME_PLURAL,
} from '@backend-demo/shared/constants';
import { ConstraintRule } from '@backend-demo/backend-libs/foreign-keys';
import { Op, WhereOptions } from 'sequelize';
import { ProductSizeName } from '@backend-demo/shared/enums';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.createTable<ProductSize>(PRODUCT_SIZE_TABLE_NAME_PLURAL, {
			name: {
				type: DataType.STRING,
				allowNull: false,
			},
			ProductCode: {
				type: DataType.UUID,
				allowNull: false,
			},
			weight: {
				type: DataType.INTEGER,
				allowNull: true,
			},
		});
	await sequelize
		.getQueryInterface()
		.addConstraint(PRODUCT_SIZE_TABLE_NAME_PLURAL, {
			fields: ['ProductCode'] as Array<keyof ProductSize> as string[],
			onDelete: ConstraintRule.CASCADE,
			onUpdate: ConstraintRule.CASCADE,
			type: 'foreign key',
			references: {
				field: 'code' as keyof Product,
				table: PRODUCT_TABLE_NAME_PLURAL,
			},
		});
	await sequelize.getQueryInterface().addIndex(
		{ tableName: PRODUCT_SIZE_TABLE_NAME_PLURAL },
		{
			fields: ['ProductCode', 'name'] as Array<keyof ProductSize>,
			type: 'UNIQUE',
			unique: true,
		}
	);
	await sequelize.getQueryInterface().addConstraint(
		{ tableName: PRODUCT_SIZE_TABLE_NAME_PLURAL },
		{
			type: 'check',
			fields: ['name'] as Array<keyof ProductSize>,
			where: {
				name: {
					[Op.in]: [
						ProductSizeName.L,
						ProductSizeName.XL,
						ProductSizeName.XS,
						ProductSizeName.XXL,
					],
				},
			} as WhereOptions<ProductSize>,
		}
	);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const down: Migration = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.dropTable({ tableName: PRODUCT_SIZE_TABLE_NAME_PLURAL });
};
