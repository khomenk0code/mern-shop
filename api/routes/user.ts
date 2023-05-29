import {Request, Response} from "express";

const CryptoJS = require("crypto-js");
const router = require("express").Router()
const {verifyTokenAndAuth, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const User = require("../models/user");

router.put("/:id", verifyTokenAndAuth, async (req: any, res: Response) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
             {new: true}
        );
        res.status(200).json(updatedUser)
    } catch (e) {
        res.status(500).json(e)
    }

})

router.delete("/:id", verifyTokenAndAuth, async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/find/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
        const user  = await User.findById(req.params.id)
        const {password, ...others} = user._doc;

        res.status(200).json(others)
    } catch (e) {
        res.status(500).json(e)
    }
})
router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    const query = req.query.new


    try {
        const allUsers  = query
            ? await User.find().sort({_id: -1}).limit(5)
            : await User.find()
        res.status(200).json(allUsers)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/stats", verifyTokenAndAdmin, async (req: Request, res: Response) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear} } },
            {
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                },
            },
        ]);
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router;

