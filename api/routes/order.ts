import {Request, Response} from "express";
const router = require("express").Router()
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const Order = require("../models/order");


router.post("/", verifyToken, async (req: Request, res: Response) => {
    const newOrder: any  = new Order(req.body)
    try {
        const savedOrder: any = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedOrder)
    } catch (e) {
        res.status(500).json(e)
    }

})

router.delete("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order was deleted!")
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:userId", verifyTokenAndAuth, async (req: Request, res: Response) => {
    try {
        const orders  = await Order.findOne({userId: req.params.userId})

        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/month", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const previousMonth = currentMonth - 1;

        const [currentMonthCount, previousMonthCount] = await Promise.all([
            Order.countDocuments({
                createdAt: {
                    $gte: new Date(`${currentYear}-${currentMonth}-01`),
                    $lt: new Date(`${currentYear}-${currentMonth + 1}-01`)
                }
            }),
            Order.countDocuments({
                createdAt: {
                    $gte: new Date(`${currentYear}-${previousMonth}-01`),
                    $lt: new Date(`${currentYear}-${currentMonth}-01`)
                }
            })
        ]);

        const result = [
            { _id: currentMonth, total: currentMonthCount },
            { _id: previousMonth, total: previousMonthCount }
        ];

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});






router.get("/income", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    const currentDate = new Date();
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.get("/topsales", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const topSales = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.productId",
                    productId: { $first: "$products._id" },
                    totalQuantity: { $sum: "$products.quantity" },
                },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 3 },
        ]);

        res.status(200).json(topSales);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;

