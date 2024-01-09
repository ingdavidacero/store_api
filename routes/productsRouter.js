import { Router } from 'express'
import ProductsService from '../services/productsService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { createProductSchema,updateProductSchema,getProductSchema } from '../schemas/productSchema.js';

const productsRouter = Router();
const service = new ProductsService();

productsRouter.get('/', async (req,res)=>{
  const products = await service.find();
  res.status(200).json(products);
});

productsRouter.get('/filter',(req,res)=>{
  res.status(200).send('Esto es un filter');
})

productsRouter.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).json({
        message:'Not found'
      });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json(newProduct);
});

productsRouter.put('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const product = await service.update(id,body);
  res.status(201).json(product);
})

productsRouter.patch('/:id',
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
  validatorHandler(getProductSchema,'params'),
  async (req,res)=>{
  const {id} = req.params;
  const product = await service.delete(id);
  res.status(200).json(product);
})

export default productsRouter;
