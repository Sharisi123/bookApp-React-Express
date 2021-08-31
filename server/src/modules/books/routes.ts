import express from "express";

const booksController = require("./controller");
const router = express.Router();

router.get("/books", booksController.getBooks);

router.get("/books/:id", booksController.getBooksById);

router.post("/books", booksController.setBooks);

router.patch("/books", booksController.updateBooksById);

router.delete("/books/:id", booksController.deleteBooksById);

module.exports = router;
