import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookListSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    realizeDate: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("books", bookListSchema);

module.exports = Books;
