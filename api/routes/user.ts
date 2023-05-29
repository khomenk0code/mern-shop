import {Response} from "express";

const CryptoJS = require("crypto-js");
const router = require("express").Router()
const {verifyTokenAndAuth} = require("../middleware/verifyToken")
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


module.exports = router;

