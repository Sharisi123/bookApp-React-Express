const mongoose = require("../../../_helpers/mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const chatsSchema = new Schema(
  {
    users: [],
    chatName: {
      type: String,
      required: true,
    },
    messages: [
      {
        _id: {
          type: ObjectId,
          required: true,
        },
        userId: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Chats = mongoose.model("chats", chatsSchema);

module.exports = Chats;
export {};
