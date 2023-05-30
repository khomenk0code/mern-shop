const mongoose = require("mongoose")

export interface IProduct {
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size: string;
    color: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;

}


const ProductsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},

},{timestamps: true});

module.exports = mongoose.model("Product", ProductsSchema)