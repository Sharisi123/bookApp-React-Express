const db = require("./models");
const mongoose = require("mongoose");
const logger = require("../../_helpers/logger");
exports.onConnect = (socket: any) => {
  let room: string = null;
  let userId: string = null;
  logger.info(`socket.io user connected, socket.id is: ${socket.id}`);

  socket.on("userJoin", (userId: string) => {
    try {
      userId = userId;

      if (!socket.rooms.has(userId)) {
        logger.info(`user (${userId}) joined`);
        socket.join(userId);
      } else {
        logger.info(`user (${userId}) already connected`);
      }
    } catch (e) {
      logger.error(e);
    }
  });

  socket.on("userLeave", (userId: string) => {
    try {
      socket.leave(userId);
      logger.info(`user (${userId}) leaved`);
    } catch (e) {
      logger.error(e);
    }
  });

  socket.on("chatJoin", (roomName: string) => {
    try {
      room = roomName;

      if (!socket.rooms.has(roomName)) {
        logger.info(`user (${roomName}) joined to chat`);
        socket.join(roomName);
      } else {
        console.log("user already connected");
        logger.info(`user (${roomName}) already connected`);
      }
    } catch (e) {
      logger.error(e);
    }
  });

  socket.on("chatLeave", (roomName: string) => {
    try {
      socket.leave(roomName);
      logger.info(`user (${roomName}) leave from chat`);
    } catch (e) {
      logger.error(e);
    }
  });

  socket.on("message", async (data: any, callback: any) => {
    try {
      const message = {
        _id: mongoose.Types.ObjectId(),
        userId: data.userId,
        username: data.username,
        message: data.message,
        createdAt: data.createdAt,
      };

      socket.broadcast.to(room).emit("message", message);
      await db.chats.findByIdAndUpdate(
        { _id: data.chatId },
        {
          $push: { messages: message },
        }
      );

      callback(message);
    } catch (e) {
      logger.error(e);
    }
  });

  socket.on("newChat", async ({ users, chatName }: any) => {
    try {
      const result = await db.chats.create({
        users,
        chatName,
        messages: [],
      });
      if (result) {
        logger.info(
          `creating new chat with this users ${users}, chatName is ${chatName}`
        );
        const companionId = users.find((item: string) => item !== userId);

        socket.to(companionId).emit("newChat", result);
        socket.emit("newChat", result);
        logger.info(`Sending new chat to another users`);
      }
    } catch (e) {
      logger.error(e);
      socket.emit("newChat", "error");
    }
  });

  socket.on("disconnect", () => {
    logger.info(`connection with user (${userId}) lost`);
  });
};

exports.getUserChats = async (req: any, res: any) => {
  const { userId } = req.query;

  try {
    const result = await db.chats.find({
      users: userId,
    });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send("user don't have chats");
    }
  } catch (e) {
    logger.error(e.message);
    res.status(500).send();
  }
};

exports.getChatById = async (req: any, res: any) => {
  try {
    const _id = req.params.id;
    const result = await db.chats.findById({ _id });
    if (result) {
      res.status(200).send(result);
    }
  } catch (e) {
    logger.error(e);
    res.status(500).send();
  }
};

export {};
