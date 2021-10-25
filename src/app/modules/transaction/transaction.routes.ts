import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { validateJwtMiddleware } from '../../middlewares/validate-jwt.middleware';
import { createTransactionValidator } from './validators/create.validator';
import { container } from 'tsyringe';

const transactionRoutes = Router();

const controller = container.resolve(TransactionController)

transactionRoutes.get('/history', validateJwtMiddleware, controller.getHistory);
transactionRoutes.post('/', validateJwtMiddleware, createTransactionValidator, controller.create);

export { transactionRoutes };
