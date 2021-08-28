import mongoose from 'mongoose';
const Schema = mongoose.Schema

const bookListSchema = new Schema({
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
  }
}, {timestamps: true})

const BookList = mongoose.model('bookList', bookListSchema)

// export default BookList
module.exports = BookList