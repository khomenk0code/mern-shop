import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size: string[];
    color: string[];
    price: number;
    altImg: string;
    createdAt?: Date;
    updatedAt?: Date;
    inStock: boolean;
}

const ProductsSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    altImg: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array, required: true },
    color: { type: Array, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductsSchema);
