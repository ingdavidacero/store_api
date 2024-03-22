import { Router } from 'express'
import OrdersService from '../services/ordersService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import {createOrderSchema, getOrderSchema, addItemSchema } from '../schemas/orderSchema.js';

const orderRouter = Router();
const service = new OrdersService();

orderRouter.get('/',
  async (req,res,next)=>{
    try {
      const products = await service.find();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
});

orderRouter.get('/:id',
  validatorHandler(getOrderSchema,'params'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const order = await service.findOne(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

orderRouter.post('/',
validatorHandler(createOrderSchema,'body'),
async (req, res, next)=>{
  try{
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  }catch(error){
    next(error);
  }
});

orderRouter.post('/add-item',
validatorHandler(addItemSchema,'body'),
async (req, res, next)=>{
  try{
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  }catch(error){
    next(error);
  }
});

export default orderRouter;
