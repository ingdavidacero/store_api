import { Router } from "express";
import productsRouter from "./productsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import usersRouter from "./usersRouter.js";

function routerApi(app){
  const router = Router();
  app.use('/api/v1',router);
  router.use('/products',productsRouter);
  router.use('/categories',categoriesRouter);
  router.use('/users',usersRouter);
}

export default routerApi;
