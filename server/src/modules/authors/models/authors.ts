import mongoose from "mongoose";
const Schema = mongoose.Schema;

const authorsSchema = new Schema(
  {
    _id: {
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
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    booksCount: {
      type: Number,
      required: true,
    },
    books: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Authors = mongoose.model("authors", authorsSchema);

module.exports = Authors;
