import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Wishlist = require("../models/cart");


router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newWishlist: any  = new Wishlist(req.body)

    try {
        const savedWishlist: any = await newWishlist.save()
        res.status(200).json(savedWishlist)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put("/:id", verifyTokenAndAuth, async (req: Request, res: Response) => {
    const wishlistId = req.params.id;
    const productId = req.body.productId;

    try {
        const updatedWishlist = await Wishlist.findByIdAndUpdate(
            wishlistId,
            { $push: { products: { productId } } },
            { new: true }
        );
        res.status(200).json(updatedWishlist);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete("/:id", verifyTokenAndAuth, async (req: Request, res: Response) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id)
        res.status(200).json("Product was removed from wishlist!")
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:userId", verifyTokenAndAuth, async (req: Request, res: Response) => {
    try {
        const list  = await Wishlist.findOne({userId: req.params.userId})

        res.status(200).json(list)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const carts = await Wishlist.find()
        res.status(200).json(carts)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;

