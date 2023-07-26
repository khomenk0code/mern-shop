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

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err: Error) => {
    console.log(err);
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


