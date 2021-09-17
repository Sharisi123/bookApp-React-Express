import { Socket } from "dgram";

const db = require("./models");
const mongoose = require("mongoose");

exports.onConnect = (socket: any) => {
  let room: string = null;
  console.log("connected");

  socket.on("join", async (roomName: string) => {
    room = roomName;

    if (!socket.rooms.has(roomName)) {
      console.log("user joined");
      socket.join(roomName);
      console.log("active rooms", socket.rooms);
    } else {
      console.log("user already connected");
    }
  });

  socket.on("chatMessage", async (data: any, callback: any) => {
    console.log("chat msg event", data);

    const message = {
      _id: mongoose.Types.ObjectId(),
      userId: data.userId,
      message: data.message,
      createdAt: data.createdAt,
    };

    socket.broadcast.to(room).emit("incomingMessage", message);
    await db.chats.findByIdAndUpdate(
      { _id: data.chatId },
      {
        $push: { messages: message },
      }
    );

    callback(message);
  });

  const createChatHandler = (newChatData: any) => {
    socket.emit("newChat", newChatData);
  };

  socket.on("disconnect", () => {
    console.log("connection disconnected");
  });
};

exports.getUserChats = async (req: any, res: any) => {
  const { userId } = req.query;
  console.log(userId);

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
    console.log(e.message);

    res.status(500).send();
  }
};

exports.getChatById = async (req: any, res: any) => {
  try {
    const _id = req.params.id;

    const result = await db.chats.findById({ _id });
    if (result) {
      // socket.emit("newChat", result);
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send();
  }
};

exports.createChat = async (req: any, res: any) => {
  const { users, chatName } = req.body;
  try {
    const result = db.chats.create({
      users,
      chatName,
      messages: [],
    });
    if (result) {
      res.status(200).send(result);
    }
  } catch (e) {
    console.log(e.message);

    res.status(500).send();
  }
};

export {};
