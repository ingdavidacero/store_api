import { Router } from 'express'
import passport from 'passport';
import jsonwebtoken from "jsonwebtoken";
import config from '../config/config.js';

const authRouter = Router();

authRouter.post('/login',
  passport.authenticate('local',{session:false}),
  async (req, res, next)=>{
    try{
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      };
      const token = jsonwebtoken.sign(payload,config.jwtSecret);
      res.status(201).json({
        user,
        token
      });
    }catch(error){
      next(error);
    }
});

export default authRouter;
