import {Request, Response} from "express";
const {verifyToken} = require("../middleware/verifyToken")
const Cart = require("../models/cart");
const { Server } = require("socket.io");

const router = require("express").Router()
const io = Server();

interface AuthReq extends Request {
    user: {
        id: string;
    };
}

router.post("/", verifyToken, async (req: AuthReq, res: Response) => {

    try {
        const userId = req.user.id;
        const newCart = req.body.products;

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { products: newCart },
            { new: true, upsert: true }
        );

        io.emit(`cartUpdated:${userId}`, updatedCart);

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ error: "Error updating cart" });
    }
});

module.exports = router;