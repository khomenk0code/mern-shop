import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Cart = require("../models/cart");

interface AuthReq extends Request {
    user: {
        id: string;
    };
}

router.post("/1", verifyToken, async (req: Request, res: Response) => {
    const newCart: any  = new Cart(req.body)

    try {
        const savedCart: any = await newCart.save()
        res.status(200).json(savedCart)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.post("/", verifyToken, async (req: AuthReq, res: Response) => {
    try {
        const userId = req.user.id;
        const newCart = req.body.products;
        console.log(req.body);
        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { products: newCart },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put("/:cartId/quantity/update", verifyToken, async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { productId, color, size, quantity } = req.body;


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


        res.status(200).json(updatedCart);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/add", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, color, size, quantity } = req.body;

        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            existingCart.products.push({
                productId,
                color,
                size,
                quantity,
            });

            const updatedCart = await existingCart.save();
            res.status(200).json(updatedCart);
        } else {
            const newCart = new Cart({
                userId: req.body.userId,
                products: [
                    {
                        productId,
                        color,
                        size,
                        quantity,
                    },
                ],
            });

            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (error) {
        res.status(500).json(error);
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


router.delete("/:cartId", verifyToken, async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;

        await Cart.findByIdAndDelete(cartId);

        res.status(200).json("Cart was deleted successfully!");
    } catch (e) {
        res.status(500).json(e);
    }
});




router.get("/find/:userId", verifyToken, async (req: any, res: Response) => {
    try {
        const cart  = await Cart.findOne({userId: req.params.userId})
        console.log("Logged user:", req.user);
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