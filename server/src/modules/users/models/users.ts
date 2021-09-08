import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: String,
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    token: String,
    phoneNumber: Number,
    books: [],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
