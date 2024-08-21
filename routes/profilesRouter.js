import { Router } from 'express'
import passport from 'passport';
import OrdersService from '../services/ordersService.js';

const profileRouter = Router();
const service = new OrdersService();

profileRouter.get('/my-orders',
  passport.authenticate('jwt',{session:false}),
  async (req, res, next)=>{
    try{
      const orders = await service.findByUser(req.user.sub);
      res.json(orders);
    }catch(error){
      next(error);
    }
});

export default profileRouter;
