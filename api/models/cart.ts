import mongoose from "mongoose";

export interface Cart extends Document{
    userId: string;
    products: [
        {
            productId: string;
            color: string;
            size: string;
            quantity: number;
        }
    ]
}

const CartSchema = new mongoose.Schema<Cart>({
    userId: {type: String, required: true},
    products: [
        {
            productId:{
                type:String
            },
             color:{
                type:String
            },
             size:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },

        }
    ],

},{timestamps: true});

module.exports = mongoose.model<Cart>("Cart", CartSchema)