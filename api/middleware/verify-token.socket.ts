
import { Socket } from "socket.io";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
const jwt = require("jsonwebtoken")


declare module "socket.io" {
    interface Socket {
        user?: IUser;
    }
}

interface IUser {
    // Define the user interface here based on your actual user model.
    _id: string;
    username: string;
    // Other user properties...
}

export const authenticateSocket = (
    socket: Socket,
    next: (err?: Error) => void,
) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token as string;

        jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            { complete: true },
            (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
                if (err) {
                    return next(new Error("Authentication error"));
                }

                // Attach the decoded user information to the socket object.
                socket.user = decoded as IUser;
                next();
            }
        );
    } else {
        next(new Error("Authentication error"));
    }
};


export default authenticateSocket;
