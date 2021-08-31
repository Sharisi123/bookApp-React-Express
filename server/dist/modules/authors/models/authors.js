"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const authorsSchema = new Schema({
    _id: {
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
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    booksCount: {
        type: Number,
        required: true,
    },
    books: {
        type: [],
        required: true,
    },
}, { timestamps: true });
const Authors = mongoose_1.default.model("authors", authorsSchema);
module.exports = Authors;
//# sourceMappingURL=authors.js.map