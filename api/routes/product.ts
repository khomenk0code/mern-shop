import {Request, Response} from "express";
const router = require("express").Router()
const {verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Product = require("../models/product");


router.post("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    const newProduct: any  = new Product(req.body)
    console.log("newProduct",newProduct)

    try {
        const savedProduct: any = await newProduct.save()
        console.log("savedProduct",savedProduct)
        res.status(200).json(savedProduct)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct)
    } catch (e) {
        res.status(500).json(e)
    }

})

router.delete("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:id", async (req: Request, res: Response) => {
    try {
        const product  = await Product.findById(req.params.id)

        res.status(200).json(product)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/", async (req: Request, res: Response) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;


    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if (qCategory) {
            products = await Product.find({categories:{
                $in: [qCategory],
                },
            });
        } else {
            products = await Product.find()
        }


        res.status(200).json(products)
    } catch (e) {
        res.status(500).json(e)
    }
})

// router.get("/stats", verifyTokenAndAdmin, async (req: Request, res: Response)=> {
//     const date = new Date()
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
//
//     try {
//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte: lastYear} } },
//             {
//                 $project: {
//                     month: {$month: "$createdAt"}
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: {$sum: 1}
//                 },
//             },
//         ]);
//         res.status(200).json(data)
//     } catch (e) {
//         res.status(500).json(e)
//     }
// })


module.exports = router;

