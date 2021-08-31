import express from "express";

// import db from './models'
const db = require("./models");

exports.createBook = () => {
  db.books.create({
    img: "http://loveread.ec/img/photo_books/88525.jpg",
    title: "Быстро падая",
    content:
      "Хейли уверена: это лето изменит ее жизнь. Она бросит вызов своим страхам и отправится в путешествие, чтобы выполнить данное лучшему другу обещание и наконец стать собой – смелой Хейли. Вот только все идет не по плану. Машина ломается, деньги заканчиваются, а ее новый знакомый, Чейз Уиттакер, кажется, влюбляется в нее!",
    realizeDate: "2020",
    authorId: "yosivoni",
    _id: "bistroPadaya",
  });
};

exports.getBooks = async (req: express.Request, res: express.Response) => {
  try {
    const result = await db.books.find().sort({ updatedAt: -1 });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getBooksById = async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const result = await db.books.findById({ _id }).sort({ updatedAt: -1 });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.setBooks = async (req: express.Request, res: express.Response) => {
  try {
    const bookList = new db.books({
      ...req.body,
    });

    const result = await bookList.save();

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.updateBooksById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await db.books.findByIdAndUpdate(
      { _id: req.body.payload.id },
      req.body.payload
    );
    await db.books.findOne({ _id: req.body.payload.id });

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.deleteBooksById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const _id = req.query.id;
    await db.books.findByIdAndDelete({ _id });
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
