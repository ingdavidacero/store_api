import { Router } from "express";
import passport from 'passport';
import CategoriesService from '../services/categoriesService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { checkRoles } from "../middlewares/auth.handler.js";
import { getCategorySchema, createCategorySchema,updateCategorySchema } from '../schemas/categorySchema.js';

const categoriesRouter = Router();
const service = new CategoriesService();

categoriesRouter.get('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  async (req,res,next)=>{
  try{
    const categories = await service.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  validatorHandler(getCategorySchema,'params'),
  async (req,res,next)=>{
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  validatorHandler(createCategorySchema,'body'),
  async (req, res, next)=>{
    try{
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
});

categoriesRouter.put('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  validatorHandler(getCategorySchema,'params'),
  validatorHandler(createCategorySchema,'body'),
  async (req,res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const category = await service.update(id,body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
});

categoriesRouter.patch('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  validatorHandler(getCategorySchema,'params'),
  validatorHandler(updateCategorySchema,'body'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const category = await service.update(id,body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  checkRoles(['admin']),
  validatorHandler(getCategorySchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const category = await service.delete(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
});

export default categoriesRouter;
