import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { HttpStatus } from '../../enums/http-status.enum';

import { TransactionService } from './transaction.service';

@autoInjectable()
export class TransactionController {

    constructor(private transactionService: TransactionService){}

    getHistory = async (req: Request, res: Response) => {
        const transactions = await this.transactionService.getHistory(req.userId as string);

        return res.status(HttpStatus.OK).json(transactions);
    }

    create = async (req: Request, res: Response) => {
        const transaction = await this.transactionService.create(req.userId as string, req.body);
        return res.status(HttpStatus.CREATED).json(transaction);
    }
}
