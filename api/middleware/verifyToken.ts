import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

const jwt = require("jsonwebtoken")


declare module "socket.io" {
    interface Socket {
        user?: IUser;
    }
}

interface customRequest extends Request {
    user: IUser
}


const verifyToken = (req: customRequest, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        const token  = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: object) => {
            if (err) res.status(403).json("Token is not valid!");

                req.user= user as IUser;
                next()
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
}

const verifyTokenAndAuth = (req: any, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    })
};
const verifyTokenAndAdmin = (req: any, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    })
};

const authenticateSocket = (
    socket: Socket,
    data: any,
    callback: (err?: ExtendedError | undefined) => void
) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            socket.user = jwt.verify(
                <string>socket.handshake.query.token,
                process.env.JWT_SECRET,
                { complete: true }
            );
            callback();
        } catch (err) {
            callback(new Error("Authentication error"));
        }
    } else {
        callback(new Error("Authentication error"));
    }
};


module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin, authenticateSocket};