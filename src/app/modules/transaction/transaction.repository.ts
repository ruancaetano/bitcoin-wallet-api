import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
    calculateAveragePrice = async (userId: string): Promise<string> => {
        const result = await this.createQueryBuilder('t')
            .select('AVG(t.unit_value)', 'avg')
            .where('t."userId" = :userId', { userId })
            .getRawOne();

        return Number(result.avg || 0).toFixed(2);
    };
}
