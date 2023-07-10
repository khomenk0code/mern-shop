import { Request, Response } from "express";

require('dotenv').config();
const router = require("express").Router();
const LiqPay = require('./liqpay');

const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);

router.post("/", async (req: Request, res: Response) => {
    const order = liqpay.cnb_form({
        'action': 'pay',
        'amount': req.body.amount,
        'currency': 'USD',
        'description': 'description text',
        'order_id': req.body.tokenId,
        'version': '3',
        'result_url': 'https://mern-shop-client.vercel.app',
        'server_url': 'https://mern-shop-api.vercel.app/api/payment/callback'
    });
    res.send(order);
});

router.post("/callback", async (req, res) => {
    const data = req.body.data;
    const signature = req.body.signature;

    const isSignatureValid = liqpay.verify_signature(data, signature);

    if (isSignatureValid) {
        const decodedData = Buffer.from(data, 'base64').toString('utf-8');
        const transactionInfo = JSON.parse(decodedData);

        console.log(transactionInfo);

        res.status(200).json({ success: true, data: transactionInfo });
    } else {
        res.status(400).json({ error: "Invalid signature" });
    }
});

router.get("/get-order/:order_id", async (req, res) => {
    const orderId = req.params.order_id;


    const data = {
        action: "status",
        version: "3",
        order_id: orderId,
    };

    liqpay.api("request", data, function(json) {

        res.status(200).json({ status: json });
    });
});

module.exports = router;
