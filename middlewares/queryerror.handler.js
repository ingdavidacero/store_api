import Boom from "@hapi/boom";

import { ValidationError } from "sequelize";

function queryErrorHandler(error,req,res,next){
  if(error instanceof ValidationError){
    throw Boom.conflict(error.errors);
  }
  next(error)
};

export default queryErrorHandler;
