import { Router } from "express";
import UsersService from "../services/usersService.js";
import { validatorHandler } from '../middlewares/validator.handler.js';
import { getUserSchema } from '../schemas/userSchema.js';

const usersRouter = Router();
const service = new UsersService()

usersRouter.get('/',async (req,res)=>{
  const users = await service.find();
  res.status(200).json(users);
});

usersRouter.get('/:id',
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

export default usersRouter;
