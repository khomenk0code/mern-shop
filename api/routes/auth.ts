import { Request, Response } from "express";
const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


router.post("/register", async (req: Request, res: Response) => {
  //TODO: errors check for other codes 400 300 200

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET,
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong username!");
    }

    const OriginalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    ).toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong password!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
