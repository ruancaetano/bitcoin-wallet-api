import { autoInjectable, injectable } from 'tsyringe';
import { DbConnection } from '../../database/connection';
import { TransactionDto } from '../common/dtos/transaction.dto';
import { UserService } from '../user/user.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionHistoryDto } from './dtos/transaction-history.dto';
import { TransactionRepository } from './transaction.repository';
@injectable()
@autoInjectable()
export class TransactionService {

    constructor(private userService: UserService, private dbConnection: DbConnection){}


    async getHistory(userId: string): Promise<TransactionHistoryDto> {
        const transactionRepository = this.dbConnection.connection.getCustomRepository(
            TransactionRepository
        );

        const user = await this.userService.getById(userId);

        const [transactions, averagePrice] = await Promise.all([
            transactionRepository.find({
                user,
            }),
            transactionRepository.calculateAveragePrice(user.id),
        ]);

        const mappedTransactions = transactions.map((item) =>
            TransactionDto.fromEntity(item)
        );

        return {
            averagePrice,
            history: mappedTransactions,
        };
    }

    async create(
        userId: string,
        body: CreateTransactionDto
    ): Promise<TransactionDto> {
        const transactionRepository = this.dbConnection.connection.getCustomRepository(
            TransactionRepository
        );

        const user = await this.userService.getById(userId);

        const newTransactionModel = transactionRepository.create({
            date: new Date(body.date),
            unit_value: body.unitValue,
            quantity: body.quantity,
            user,
        });

        const newTransaction = await transactionRepository.save(
            newTransactionModel
        );

        return TransactionDto.fromEntity(newTransaction);
    }
}
