import express from "express";
import cors from "cors";
import routerApi from "./routes/index.js";
import { checkApiKey } from "./middlewares/auth.handler.js";
import {logError, errorHandler, boomErrorHandler} from "./middlewares/error.handler.js";
import queryErrorHandler from "./middlewares/queryerror.handler.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

const whiteList = [
  'http://localhost:3000',
  'https://ingdavidacero.com/'
];

const options = {
  origin:(origin, cb)=>{
    if(whiteList.includes(origin) || !origin){
      cb(null,true);
    }else{
      cb(new Error('Acceso no permitido.'));
    }
  }
}
app.use(cors(options));

import "./utils/auth/index.js";

app.get('/',(req,res)=>{
  res.send('Soy el server en express');
});

app.get('/ruta-prueba',checkApiKey, (req,res)=>{
  res.send('Prueba de la ruta');
});

routerApi(app);

app.use(logError);
app.use(queryErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Se esta ejecutando en el puerto http://localhost:${PORT}`);
});
