import { Router } from "express";
import passport from 'passport';
import UsersService from "../services/usersService.js";
import { validatorHandler } from '../middlewares/validator.handler.js';
import { getUserSchema, createUserSchema, updateUserSchema } from '../schemas/userSchema.js';

const usersRouter = Router();
const service = new UsersService()

usersRouter.get('/',
  passport.authenticate('jwt',{session:false}),
  async (req,res)=>{
  try{
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getUserSchema,'params'),
  async (req,res,next)=>{
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

usersRouter.post('/',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(createUserSchema,'body'),
  async (req,res, next)=>{
    try{
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
});

usersRouter.put('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getUserSchema,'params'),
  validatorHandler(createUserSchema,'body'),
  async (req,res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const user = await service.update(id,body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
});

usersRouter.patch('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  validatorHandler(getUserSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const user = await service.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

export default usersRouter;
