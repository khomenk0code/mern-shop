import * as http from "http";
import { Server } from "socket.io";
import authenticateSocket from "./middleware/verify-token.socket";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/product");
const ordersRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const paymentRouter = require("./routes/payment");
const configRouter = require("./routes/firebase-config");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://mern-shop-client.vercel.app",
      "https://mern-shop-api.vercel.app",
      "https://mern-shop-admin.vercel.app",
      "http://localhost:3006"
    ]
  }
});

app.use((req:any, res:any, next:any) => {
  req.io = io;
  next();
});

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err: Error) => {
    console.log(err);
  });

io.use((socket, next) => {
  authenticateSocket(socket, (err?: Error) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

app.set("socketServer", io);

io.on("connection", (socket) => {
  console.log("A client connected");
  socket.on("updateCart", async (formattedProducts) => {
    console.log(formattedProducts);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/config", configRouter);
app.options("/api/payment", cors());

server.listen(() => {
  console.log("Server is running");
});



