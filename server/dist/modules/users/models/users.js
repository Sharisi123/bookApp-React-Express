"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    provider: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: String,
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
const User = mongoose_1.default.model("users", userSchema);
module.exports = User;
//# sourceMappingURL=users.js.map