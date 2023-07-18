import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Cart = require("../models/cart");


router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newCart: any  = new Cart(req.body)

    try {
        const savedCart: any = await newCart.save()
        res.status(200).json(savedCart)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put("/:cartId/quantity/update", verifyToken, async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { productId, color, size, quantity } = req.body;

        console.log("Received data:", { cartId, productId, color, size, quantity });


        const updatedCart = await Cart.findOneAndUpdate(
            {
                _id: cartId,
                "products.productId": productId,
                "products.color": color,
                "products.size": size
            },
            {
                $set: { "products.$.quantity": quantity }
            },
            { new: true }
        );

        console.log("Updated cart:", updatedCart);

        res.status(200).json(updatedCart);
    } catch (e) {
        res.status(500).json(e);
    }
});



router.delete("/:cartId/products/delete", verifyToken, async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { productId, color, size } = req.body;

        await Cart.findOneAndUpdate(
            {
                _id: cartId
            },
            {
                $pull: { "products": { productId, color, size } }
            },
            { new: true }
        );

        res.status(200).json("Product was removed from cart!");
    } catch (e) {
        res.status(500).json(e);
    }
});



router.get("/find/:userId", verifyToken, async (req: Request, res: Response) => {
    try {
        const cart  = await Cart.findOne({userId: req.params.userId})

        res.status(200).json(cart)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;