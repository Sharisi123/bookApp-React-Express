import express from "express";
const router = express.Router();

const authorController = require("./controller");

router.get("/authors", authorController.getAuthors);

router.get("/authors/:id", authorController.getAuthorsById);

module.exports = router;
