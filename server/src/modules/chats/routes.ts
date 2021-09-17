import express from "express";

const chatsController = require("./controller");

const router = express.Router();

router.get("/chats", chatsController.getUserChats);

router.post("/chats/createChat", chatsController.createChat);

module.exports = router;
