import mongoose from "mongoose";

export interface IWishlist extends Document {
  userId: string;
  productId: string[];
}

const wishlistSchema = new mongoose.Schema<IWishlist>({
  userId: { type: String, required: true },
  productId: [{ type: String, },],
});

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

module.exports = Wishlist;
