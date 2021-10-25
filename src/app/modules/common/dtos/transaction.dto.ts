import { Transaction } from '../../transaction/transaction.entity';

export class TransactionDto {
    id: string;
    date: Date;
    unitValue: number;
    quantity: number;

    static fromEntity(transaction: Transaction) {
        const transactionDto = new TransactionDto();

        transactionDto.id = transaction.id;
        transactionDto.date = transaction.date;
        transactionDto.unitValue = transaction.unit_value;
        transactionDto.quantity = transaction.quantity;

        return transactionDto;
    }
}
