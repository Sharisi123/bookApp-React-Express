"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController = require("./controller");
const router = express_1.default.Router();
router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBooksById);
router.post("/books", booksController.setBooks);
router.patch("/books", booksController.updateBooksById);
router.delete("/books/:id", booksController.deleteBooksById);
module.exports = router;
//# sourceMappingURL=routes.js.map