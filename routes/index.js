import { Router } from "express";
import productsRouter from "./productsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import usersRouter from "./usersRouter.js";
import customersRouter from "./costumersRouter.js";
import ordersRouter from "./ordersRouter.js";
import authRouter from "./AuthRouter.js";
import profileRouter from "./profilesRouter.js";

function routerApi(app){
  const router = Router();
  app.use('/api/v1',router);
  router.use('/products',productsRouter);
  router.use('/categories',categoriesRouter);
  router.use('/users',usersRouter);
  router.use('/customers',customersRouter);
  router.use('/orders',ordersRouter);
  router.use('/auth',authRouter);
  router.use('/profile',profileRouter);
}

export default routerApi;
