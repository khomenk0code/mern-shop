import mongoose from "mongoose";


const wishlistSchema = new mongoose.Schema({
    userId: {type: String},
    productId: [
        {
            type:String
        }
    ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;