"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phoneNumber: Number,
    books: [],
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);
const User = mongoose_1.default.model("users", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map