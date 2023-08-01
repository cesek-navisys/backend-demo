import { databaseModels } from '@backend-demo/backend-libs/tables';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: 'localhost',
<<<<<<< HEAD
				port: 54320,
=======
				port: 5432,
>>>>>>> upstream/main
				username: 'postgres',
				password: 'postgres',
				database: 'backend-demo',
			});
			sequelize.addModels(databaseModels);
			await sequelize.sync();
			return sequelize;
		},
	},
];
