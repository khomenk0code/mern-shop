import { Request, Response } from "express";
import crypto from "crypto";
const Cart = require("../models/cart");
require("dotenv").config();
const router = require("express").Router();
const LiqPay = require("./liqpay");
const {verifyToken} = require("../middleware/verifyToken")

const liqpay = new LiqPay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY,
);

router.post("/", verifyToken, async (req: any, res: Response) => {

    const cart = await Cart.findOne(
        { userId: req.user.id }
    );

    const order = liqpay.cnb_form({
    action: "pay",
    amount: req.body.amount,
    currency: "USD",
    description: JSON.stringify(cart),
    order_id: `${req.user.id}_1`,
    version: "3",
    result_url: "https://mern-shop-client.vercel.app/cart?result=success",
    server_url: "https://mern-shop-api.vercel.app/api/payment/liqpay-callback",
  });

  console.log(req.body);
  res.send(order);
});

const verifyCallbackSignature = (data, signature, private_key) => {
  const sign = crypto
    .createHash("sha1")
    .update(private_key + data + private_key)
    .digest("binary");
  const calculatedSignature = Buffer.from(sign, "binary").toString("base64");

  return signature === calculatedSignature;
};

router.post("/liqpay-callback", async (req, res) => {
  const data = req.body.data;
  const signature = req.body.signature;
  const isValidSignature = verifyCallbackSignature(
    data,
    signature,
    process.env.LIQPAY_PRIVATE_KEY,
  );

  if (!isValidSignature) {
    res.status(403).json({ error: "Invalid signature" });
    return;
  }
    res.status(200).json({ status: "success" });

  const decodedData = Buffer.from(data, "base64").toString("utf-8");
  const paymentInfo = JSON.parse(decodedData);
  const userId = paymentInfo.order_id.split("_")[0]
    console.log("paymentInfo", paymentInfo);
    console.log("userId", userId);


});

router.get("/get-order/:order_id", async (req, res) => {
  const orderId = req.params.order_id;

  const data = {
    action: "status",
    version: "3",
    order_id: orderId,
  };

  liqpay.api("request", data, function (json) {
    console.log("LiqPay API Response:", json);

    res.status(200).json({ status: json });
  });
});

router.get("/get-orders", async (req, res) => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  const dateFrom = yesterday.getTime(); // Получить timestamp для вчерашней даты
  const dateTo = currentDate.getTime();

  const data = {
    action: "reports",
    version: "3",
    date_from: dateFrom,
    date_to: dateTo,
  };

  liqpay.api("request", data, function (json) {
    res.status(200).json(json);
  });
});

module.exports = router;
