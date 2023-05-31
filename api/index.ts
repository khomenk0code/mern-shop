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

dotenv.config()


const PORT = 5000 || process.env.PORT;

mongoose.connect(
    process.env.MONGO_URL
)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err: Error) => {
        console.log(err);
    })


app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productsRouter)
app.use("/api/orders", ordersRouter)
app.use("/api/cart", cartRouter)
app.use("/api/payment", paymentRouter)


app.listen(PORT, () => {
    console.log(`Backend server is running on port:${PORT}`)
})