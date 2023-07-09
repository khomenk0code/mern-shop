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
        'version': '3'
    });
    res.send(order)
})


router.post("/liqpay-callback", async (req: Request, res: Response) => {
    const { data, signature } = req.body;

    console.log("Received data:", data);
    console.log("Received signature:", signature);

    const sign = liqpay.str_to_sign(process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY);
    console.log("Calculated signature:", sign);

    if (signature !== sign) {
        console.log("Signature verification failed");
        res.sendStatus(400);
        return;
    }

    liqpay.api("request", {
        "action": "status",
        "version": "3",
        "order_id": "order_id_1"
    }, function(json) {
        console.log("Received LiqPay response:", json);

        const paymentStatus = json.status;

        res.status(200).json({ status: paymentStatus });
    });
});


module.exports = router;