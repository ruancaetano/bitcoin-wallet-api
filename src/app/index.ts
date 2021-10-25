import express from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { errorHandlerMiddleware } from './middlewares/error.middleware';
import { transactionRoutes } from './modules/transaction/transaction.routes';
import { autoInjectable } from 'tsyringe';
import { DbConnection } from './database/connection';

@autoInjectable()
export class App {
    server = express();

    constructor(private dbConnection: DbConnection) {
        this.configure();
    }

    configure = async () => {
        await this.dbConnection.init();

        this.server.use(express.json());
        this.setupRoutes();
        this.setupMiddlewares();
    };

    setupRoutes = () => {
        this.server.get('/status', (req, res) => {
            res.send('ok');
        });

        this.server.use('/auth', authRoutes);
        this.server.use('/transactions', transactionRoutes);
    };

    setupMiddlewares = () => {
        this.server.use(errorHandlerMiddleware);
    };
}
