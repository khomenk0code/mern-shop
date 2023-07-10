import { Request, Response } from "express";
import axios from "axios";
import qs from "querystring";
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
        'server_url': 'https://mern-shop-api.vercel.app'
    });
    res.send(order);
});

router.get("/get-order/:order_id", async (req, res) => {
    const orderId = req.params.order_id;

    const data = {
        action: "status",
        version: "3",
        order_id: orderId,
    };

    const signature = liqpay.str_to_sign(process.env.LIQPAY_PRIVATE_KEY + JSON.stringify(data) + process.env.LIQPAY_PRIVATE_KEY);

    try {
        const response = await axios.post("https://www.liqpay.ua/api/request", qs.stringify({
            data: Buffer.from(JSON.stringify(data)).toString('base64'),
            signature: Buffer.from(signature).toString('base64')
        }));

        console.log("LiqPay API Response:", response.data);

        const paymentStatus = response.data.status;
        res.status(200).json({ status: paymentStatus });
    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({ error: "Failed to fetch payment status" });
    }
});

module.exports = router;
