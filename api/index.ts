import * as http from "http";
import { Server, Socket } from "socket.io";
import authenticateSocket from "./middleware/verify-token.socket";

const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productsRouter = require("./routes/product")
const ordersRouter = require("./routes/order")
const cartRouter = require("./routes/cart")
const paymentRouter = require("./routes/payment")
const configRouter = require("./routes/firebase-config")
const cors = require('cors');


const server = http.createServer(app);
const io = new Server(server);



dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err: Error) => {
        console.log(err);
    })

io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("someEvent", (data) => {
        console.log("socket data", data );
        console.log(`Received event from user ${socket.user?._id}`);
    });
    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

io.use((socket: Socket, next) => {
    authenticateSocket(socket, socket.handshake.query, next);
});



app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/cart", cartRouter)
app.use("/api/payment", paymentRouter)
app.use('/api/config', configRouter);


app.options("/api/payment", cors());


server.listen(() => {
    console.log("Server is running");
});