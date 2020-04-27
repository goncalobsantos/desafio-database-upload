import { Router } from 'express';

import { getRepository } from 'typeorm';
import CreateCategoryService from '../services/CreateCategoryService';
import Category from '../models/Category';
import DeleteCategoryService from '../services/DeleteCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const categories = await categoriesRepository.find();
  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({ title });

  return response.json(category);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteCategory = new DeleteCategoryService();
  await deleteCategory.execute({ id });
  return response.status(204).json({ message: 'Category deleted' });
});

export default categoriesRouter;
