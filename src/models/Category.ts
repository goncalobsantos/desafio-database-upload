import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Transaction from './Transaction';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, transactions => transactions.category)
  transaction: Transaction;
}

export default Category;
