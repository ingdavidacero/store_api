import { Router } from 'express'
import passport from 'passport';
import ProductsService from '../services/productsService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { createProductSchema,updateProductSchema,getProductSchema, queryProductSchema } from '../schemas/productSchema.js';

const productsRouter = Router();
const service = new ProductsService();

productsRouter.get('/',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(queryProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
});

productsRouter.get('/filter',(req,res)=>{
  res.status(200).send('Esto es un filter');
})

productsRouter.get('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(createProductSchema,'body'),
  async (req, res, next)=>{
    try{
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    }catch(error){
      next(error);
    }
});

productsRouter.put('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getProductSchema,'params'),
  validatorHandler(createProductSchema,'body'),
  async (req, res, next)=>{
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id,body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
})

productsRouter.patch('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
})

productsRouter.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const product = await service.delete(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
})

export default productsRouter;
