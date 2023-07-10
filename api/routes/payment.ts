import {Request, Response} from "express";
require('dotenv').config();
const router = require("express").Router()
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
    res.send(order)
})


router.get("/get-order/:order_id", async (req, res) => {
    const orderId = req.params.order_id;

    liqpay.api("request", {
        "action": "status",
        "version": "3",
        "order_id": orderId
    }, function(json) {
        // Обработка ответа и отправка данных о товаре
        const orderStatus = json.status;
        res.status(200).json({ status: orderStatus });
    });
});



module.exports = router;