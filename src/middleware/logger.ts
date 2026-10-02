import { Request, Response, NextFunction} from  'express';

const logger=(req: Request ,res:Response, next:NextFunction)=>{
  const time=new Date(Date.now()).toLocaleDateString();
  console.log(`[${time}] ${req.method.toString()} ${req.url.toString()}`);
  next();
}

module.exports = logger;