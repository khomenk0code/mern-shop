const mongoose = require("mongoose")

const ProductsSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    size: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},

},{timestamps: true});

module.exports = mongoose.model("Products", ProductsSchema)