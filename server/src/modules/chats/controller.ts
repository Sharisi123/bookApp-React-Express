import { Socket } from "dgram";

const db = require("./models");
const mongoose = require("mongoose");

exports.onConnect = (socket: any) => {
  let room: string = null;
  let userId: string = null;
  console.log("connected");

  socket.on("userJoin", (userId: string) => {
    userId = userId;

    if (!socket.rooms.has(userId)) {
      console.log("user joined");
      socket.join(userId);
    } else {
      console.log("user already connected");
    }
  });

  socket.on("userLeave", (userId: string) => {
    socket.leave(userId);
    console.log("user leave");
  });

  socket.on("chatJoin", (roomName: string) => {
    room = roomName;

    if (!socket.rooms.has(roomName)) {
      console.log("user joined to chat");
      socket.join(roomName);
    } else {
      console.log("user already connected");
    }
  });

  socket.on("chatLeave", (roomName: string) => {
    socket.leave(roomName);
    console.log("user leave from chat");
  });

  socket.on("message", async (data: any, callback: any) => {
    console.log("chat msg event", data);

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
  });

  socket.on("newChat", async ({ users, chatName }: any) => {
    try {
      const result = await db.chats.create({
        users,
        chatName,
        messages: [],
      });
      if (result) {
        console.log("create new chat", result);
        const companionId = users.find((item: string) => item !== userId);

        socket.to(companionId).emit("newChat", result);
        socket.emit("newChat", result);
      }
    } catch (e) {
      console.log(e.message);
      socket.emit("newChat", "error");
    }
  });

  socket.on("disconnect", () => {
    console.log("connection disconnected");
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
    console.log(e.message);

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
    res.status(500).send();
  }
};

export {};
