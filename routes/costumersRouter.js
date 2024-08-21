import { Router } from "express";
import passport from 'passport';
import customersService from '../services/customersService.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { getCustomerSchema, createCustomerSchema,updateCustomerSchema  } from "../schemas/customerSchema.js";

const customersRouter = Router();
const service = new customersService();

customersRouter.get('/',
  passport.authenticate('jwt',{session:false}),
  async (req,res)=>{
  try{
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

customersRouter.get('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getCustomerSchema,'params'),
  async (req,res,next)=>{
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

customersRouter.post('/',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(createCustomerSchema,'body'),
  async (req, res, next)=>{
    try{
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
});

customersRouter.put('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getCustomerSchema,'params'),
  validatorHandler(createCustomerSchema,'body'),
  async (req,res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const customer = await service.update(id,body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
});

customersRouter.patch('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getCustomerSchema,'params'),
  validatorHandler(updateCustomerSchema,'body'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const customer = await service.update(id,body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

customersRouter.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getCustomerSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const customer = await service.delete(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
});

export default customersRouter;
