import { Request,Response,NextFunction } from "express";

export interface AuthRequest extends Request{
  user?:IUser;
}

import jwt from 'jsonwebtoken';
import User from '../model/User';
import { IUser } from "../model/User";

const protect = async (req:AuthRequest, res:Response, next:NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as { id:string };

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
