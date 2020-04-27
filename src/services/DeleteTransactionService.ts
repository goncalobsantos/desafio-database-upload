// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionExist = await transactionsRepository.findOne(id);
    if (!transactionExist) {
      throw new AppError('Transaction with that id does not exist');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
