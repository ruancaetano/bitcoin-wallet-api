import './dotenv.config'

import { resolve } from "path";
import { ConnectionOptions } from "typeorm";

export const typeormConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
    entities: [resolve(__dirname, '../modules/**/*.entity.ts')],
    migrations: [resolve(__dirname, '../database/migrations/*.ts')],
    cli: {
        migrationsDir: resolve(__dirname, '../database/migrations'),
    },
} ;
