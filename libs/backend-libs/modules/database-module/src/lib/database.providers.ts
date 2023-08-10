import { databaseModels } from '@backend-demo/backend-libs/tables';
import { Sequelize } from 'sequelize-typescript';
import { createNamespace } from 'cls-hooked';

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const myNamespace = createNamespace('my-namespace');
			Sequelize.useCLS(myNamespace);
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: 'localhost',
				port: Number(process?.env?.['DB_PORT']) ?? 5432,
				username: 'postgres',
				password: 'postgres',
				database: 'backend-demo',
				sync: { force: false },
			});
			sequelize.addModels(databaseModels);
			await sequelize.sync();
			return sequelize;
		},
	},
];
