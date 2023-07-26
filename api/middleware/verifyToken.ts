import { Response, NextFunction, Request } from "express";
import { IUser } from "../models/user";
const jwt = require("jsonwebtoken");

interface customRequest extends Request {
  user: IUser;
}

const verifyToken = (req: customRequest, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: object) => {
      if (err) res.status(403).json("Token is not valid!");

      req.user = user as IUser;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuth = (req: customRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};
const verifyTokenAndAdmin = (req: customRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
