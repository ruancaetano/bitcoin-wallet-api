import { TransactionDto } from '../../common/dtos/transaction.dto';

export class TransactionHistoryDto {
    averagePrice: string | number;
    history: TransactionDto[];
}
