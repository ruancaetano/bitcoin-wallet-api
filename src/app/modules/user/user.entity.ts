import { BaseEntity } from '../../base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity('users')
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Transaction, (transaction) => transaction.user, {
        eager: false,
    })
    transactions: Transaction[];
}
