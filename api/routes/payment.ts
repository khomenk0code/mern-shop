import {Request, Response} from "express";
require('dotenv').config();
const router = require("express").Router()
const LiqPay = require('./liqpay');


const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC_KEY, process.env.LIQPAY_PRIVATE_KEY);


router.post("/", async (req: Request, res: Response) => {

    const order = liqpay.cnb_form({
        'action': 'pay',
        'amount': req.body.amount,
        'currency': 'UAH',
        'description': 'description text',
        'order_id': req.body.tokenId,
        'version': '3'
    });
    res.send(order)
})



module.exports = router;