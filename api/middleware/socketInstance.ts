import { Server } from "socket.io";

let ioInstance: Server | null = null;

export const setSocketInstance = (io: Server) => {
    ioInstance = io;
};

export const getSocketInstance = (): Server | null => {
    return ioInstance;
};
