import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    image?: string;
    fullName?: string;
    phone?: string;
    birthDate?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
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

module.exports = mongoose.model<IUser>("User", UserSchema)