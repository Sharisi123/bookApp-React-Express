"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookListSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    realizeDate: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Books = mongoose_1.default.model("books", bookListSchema);
module.exports = Books;
//# sourceMappingURL=books.js.map