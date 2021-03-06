import express from "express";

const authorController = require("./controller");
const router = express.Router();

router.get("/authors", authorController.getAuthors);

router.post("/authors", authorController.setNewAuthor);

router.get("/authors/:id", authorController.getAuthorsById);

router.patch("/author/:id", authorController.updateAuthorBooks);
module.exports = router;
