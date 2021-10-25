import { BaseEntity } from '../../base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
    @Column({ type: 'decimal' })
    unit_value: number;

    @Column({ type: 'decimal' })
    quantity: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => User, (user) => user.transactions, { eager: false })
    user: User;
}
