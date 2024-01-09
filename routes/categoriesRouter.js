import { Router } from "express";
import CategoriesService from '../services/categoriesService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { getCategorySchema } from '../schemas/categorySchema.js';

const categoriesRouter = Router();
const service = new CategoriesService();

categoriesRouter.get('/', async (req,res)=>{
  const categories = await service.find();
  res.status(200).json(categories);
})

categoriesRouter.get('/:id',
  validatorHandler(getCategorySchema,'params'),
  async (req,res)=>{
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.status(200).json({
      id,
      data:category
    });
  } catch (error) {
    next(error);
  }
});

export default categoriesRouter;
