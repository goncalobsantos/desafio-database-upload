import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    if (type === 'outcome') {
      const balance = await transactionsRepository.getBalance();
      if (balance.total < value) {
        throw new AppError(
          `You don't have enough money to make that transaction, current balance is: ${balance.total}`,
          400,
        );
      }
    }

    let dbCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!dbCategory) {
      dbCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(dbCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id: dbCategory.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
