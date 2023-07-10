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
        action: 'status',
        version: '3',
        order_id: orderId,
    };

    const dataString = qs.stringify(data);
    const signature = Buffer.from(process.env.LIQPAY_PRIVATE_KEY + dataString + process.env.LIQPAY_PRIVATE_KEY).toString('base64');

    const requestData = {
        data: dataString,
        signature: signature,
    };

    axios.post('https://www.liqpay.ua/api/request', qs.stringify(requestData))
        .then(response => {
            const orderStatus = response.data.status;
            res.status(200).json({ status: orderStatus });
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

module.exports = router;
