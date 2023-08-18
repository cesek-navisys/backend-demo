import { createNamespace } from 'cls-hooked';
import { Sequelize } from 'sequelize';
import { migrator, sequelize } from './umzug';

export const sequelizeNamespace = createNamespace('sequelize-transaction');
Sequelize.useCLS(sequelizeNamespace);

/**
 * In development, run with:
 * TS_NODE_PROJECT=./apps/backend-api/src/database/tsconfig.json node -r tsconfig-paths/register -r ts-node/register ./apps/backend-api/src/database/migrate-up-within-transaction.ts
 *
 * In production, run the compiled code from within the `backend-api` folder with:
 * node database/apps/backend-api/src/database/migrate-up-within-transaction.js
 */

void (async () => {
    await sequelize.transaction(async () => {
        await migrator.up();
    });
})();
