import Boom from "@hapi/boom";
import config from "../config/config.js";

function checkApiKey(req,res,next){
  const apiKey = req.headers['api'];
  if(apiKey===config.apiKey){
    next();
  }else{
    next(Boom.unauthorized());
  }
}

function checkRoles(roles){
  return (req,res,next)=>{
    const user = req.user;
    if(roles.includes(user.role)){
      next();
    }else{
      next(Boom.unauthorized());
    }
  }
}

export {checkApiKey,checkRoles};
