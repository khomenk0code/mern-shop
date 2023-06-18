import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {
        type: Boolean,
        default: false,
    },
    image: {type: String},
    fullName: {type: String},
    phone: {type: String},
    birthDate: {
        type: Date,
    },

},{timestamps: true});

module.exports = mongoose.model("User", UserSchema)