import { Response, NextFunction} from "express";
const jwt = require("jsonwebtoken")





const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers.token


    if (authHeader) {
        const token  = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: object) => {
            if (err) res.status(403).json("Token is not valid!");

                req.user = user;
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




module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};