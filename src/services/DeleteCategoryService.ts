import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';

interface RequestDTO {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const categoriesRepository = getRepository(Category);

    const categoryExist = await categoriesRepository.findOne(id);
    if (!categoryExist) {
      throw new AppError('Category with that id does not exist');
    }

    await categoriesRepository.delete(id);
  }
}

export default DeleteCategoryService;
