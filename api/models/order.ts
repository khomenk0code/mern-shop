import mongoose from "mongoose";
import { Cart } from "./cart";

export interface IOrder extends Cart {
  amount: number;
  address: {};
  status: string;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model<IOrder>("Order", OrderSchema);
