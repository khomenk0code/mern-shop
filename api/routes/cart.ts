import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("../middleware/verifyToken")
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


router.put("/:id", verifyTokenAndAuth, async (req: Request, res: Response) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedCart)
    } catch (e) {
        res.status(500).json(e)
    }

})

router.delete("/:id", verifyTokenAndAuth, async (req: Request, res: Response) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product was removed from cart!")
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:userId", verifyTokenAndAuth, async (req: Request, res: Response) => {
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

