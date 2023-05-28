import {Request, Response} from "express";
const router = require("express").Router()
const User = require("../models/user");
const CryptoJS  = require("crypto-js");


router.post("/register", async (req: Request, res: Response) => {
    //TODO: errors check for other codes 400 300 200

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
    });

    try {

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post("/login", async (req: Request, res: Response) => {

})



module.exports = router;

