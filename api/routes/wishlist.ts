import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Wishlist = require("../models/wishlist");


router.post("/", verifyToken, async (req: Request, res: Response) => {
    const { userId, ...wishlistData } = req.body;
    const newWishlist = new Wishlist({ userId, ...wishlistData });

    try {
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
    } catch (e) {
        res.status(500).json(e);
    }
});



router.put("/:id", verifyToken, async (req: Request, res: Response) => {
    const wishlistId = req.params.id;
    const productId = req.body.productId;

    try {
        const wishlist = await Wishlist.findById(wishlistId);

        if (wishlist) {
            const existingProductIndex = wishlist.productId.indexOf(productId);
            if (existingProductIndex === -1) {
                // Если продукт еще не существует в вишлисте, добавляем его
                wishlist.productId.push(productId);
                const updatedWishlist = await wishlist.save();
                res.status(200).json(updatedWishlist);
            } else {
                // Если продукт уже существует в вишлисте, возвращаем текущий вишлист без изменений
                res.status(200).json(wishlist);
            }
        } else {
            // Вишлист не найден
            res.status(404).json({ message: "Wishlist not found" });
        }
    } catch (e) {
        res.status(500).json(e);
    }
});


router.put("/:id/:productId", verifyToken, async (req: Request, res: Response) => {
    const wishlistId = req.params.id;
    const productId = req.params.productId;

    try {
        const updatedWishlist = await Wishlist.findByIdAndUpdate(
            wishlistId,
            { $pull: { productId: productId } },
            { new: true }
        );
        res.status(200).json(updatedWishlist);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete("/:id", verifyToken, async (req, res) => {
    const wishlistId = req.params.id;

    try {
        const updatedWishlist = await Wishlist.findByIdAndUpdate(
            wishlistId,
            { $set: { productId: [] } },
            { new: true }
        );
        res.status(200).json(updatedWishlist);
    } catch (e) {
        res.status(500).json(e);
    }
});


router.get("/find/:userId", verifyToken, async (req: Request, res: Response) => {
    try {
        const list  = await Wishlist.findOne({userId: req.params.userId})

        res.status(200).json(list)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const wishlist = await Wishlist.find()
        res.status(200).json(wishlist)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;

