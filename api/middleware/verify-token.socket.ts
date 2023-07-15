import { IUser } from "../models/user";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
const jwt = require("jsonwebtoken")


declare module "socket.io" {
    interface Socket {
        user?: IUser;
    }
}

const authenticateSocket = (
    socket: Socket,
    data: any,
    callback: (err?: ExtendedError | undefined) => void
) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token as string;

        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            { complete: true },
            (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
                if (err) {
                    callback(new Error("Authentication error"));
                } else {
                    socket.user = decoded as IUser;
                    callback();
                }
            }
        );
    } else {
        callback(new Error("Authentication error"));
    }
};


export default authenticateSocket;
