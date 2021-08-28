"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookListSchema = new Schema({
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
    }
}, { timestamps: true });
const BookList = mongoose_1.default.model('bookList', bookListSchema);
// export default BookList
module.exports = BookList;
//# sourceMappingURL=bookList.js.map