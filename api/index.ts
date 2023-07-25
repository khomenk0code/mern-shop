import * as http from "http";
import { Server } from "socket.io";
import authenticateSocket from "./middleware/verify-token.socket";
import { setSocketInstance } from "./middleware/socketInstance";

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
const Cart = require("../api/models/cart");

const app = express();
const server = http.createServer(app);

const io = new Server(server);



dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err: Error) => {
    console.log(err);
  });




io.on("connection", async (socket) => {
  console.log("A client connected");

  // try {
  //   const userId = socket.user ? socket.user._id : null;
  //   if (userId) {
  //     const cart = await Cart.findOne({ userId });
  //     if (cart) {
  //       socket.emit("cartData", cart.products);
  //       console.log("Emitted cartData to user:", userId);
  //     } else {
  //       console.log("Cart not found for user:", userId);
  //     }
  //   } else {
  //     console.log("User not authenticated");
  //   }
  // } catch (error) {
  //   console.error("Error fetching cart data:", error);
  // }
  //
  // socket.on("updateCart", async (formattedProducts) => {
  //   try {
  //     const userId = socket.user ? socket.user._id : null;
  //     if (userId) {
  //       const updatedCart = await Cart.findOneAndUpdate(
  //           { userId },
  //           { products: formattedProducts },
  //           { new: true, upsert: true }
  //       );
  //
  //       io.emit(`cartUpdated:${userId}`, updatedCart);
  //       console.log(`Emitted cartUpdated event for user ${userId}`);
  //     } else {
  //       console.log("User not authenticated");
  //     }
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //   }
  // });

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


module.exports = app;


