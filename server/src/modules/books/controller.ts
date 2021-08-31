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

exports.getBooks = (req: express.Request, res: express.Response) => {
  db.books
    .find()
    .sort({ updatedAt: -1 })
    .then((result: any) => res.send(result))
    .catch((e: any) => {
      res.send({ status: "ERROR" });
      console.log(e);
    });
};
exports.getBooksById = (req: express.Request, res: express.Response) => {
  const _id = req.params.id;
  db.books
    .findById({ _id })
    .sort({ updatedAt: -1 })
    .then((result: any) => res.send(result))
    .catch((e: any) => {
      res.send({ status: "ERROR" });
      console.log(e);
    });
};
exports.setBooks = (req: express.Request, res: express.Response) => {
  console.log(req.body);

  const bookList = new db.books({
    ...req.body,
  });

  bookList
    .save()
    .then((result: any) => res.send(result))
    .catch((e: any) => {
      res.send({ status: "ERROR" });
      console.log(e);
    });
};
exports.updateBooksById = (req: express.Request, res: express.Response) => {
  db.books
    .findByIdAndUpdate({ _id: req.body.payload.id }, req.body.payload)
    .then(() =>
      db.books
        .findOne({ _id: req.body.payload.id })
        .then(() => res.send({ status: "OK" }))
    )
    .catch((e: any) => {
      res.send({ status: "ERROR" });
      console.log(e);
    });
};
exports.deleteBooksById = (req: express.Request, res: express.Response) => {
  const _id = req.query.id;
  db.books
    .findByIdAndDelete({ _id })
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((e: any) => {
      res.send({ status: "ERROR" });
      console.log(e);
    });
};
