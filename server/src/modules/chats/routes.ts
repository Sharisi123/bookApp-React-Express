import express from "express";

const chatsController = require("./controller");

const router = express.Router();

router.get("/chats", chatsController.getUserChats);

router.get("/chats/:id", chatsController.getChatById);

module.exports = router;
