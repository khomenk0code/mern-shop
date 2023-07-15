import mongoose from "mongoose";


const wishlistSchema = new mongoose.Schema({
    userId: {type: String},
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;