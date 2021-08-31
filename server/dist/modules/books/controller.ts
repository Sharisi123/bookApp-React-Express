import express from "express";

// import db from './models'
const db = require("./models");

exports.createBook = () => {
  db.books.create({
    img: "http://loveread.ec/img/photo_books/97463.jpg",
    title: "Взлетая высоко",
    content:
      "У Хейли есть секрет. Вернее, был. Тайна, которая толкнула ее на отчаянный шаг – побег из дома. Теперь прошлое выплыло наружу, а ведь она так не хотела никому открываться, тем более Чейзу.Ей необходимо ехать дальше, скрыться из Фервуда, в котором они провели так много счастливых дней, чтобы воплотить в жизнь свой страшный план.Чейз не хочет ее отпускать, но хватит ли его любви, чтобы все исправить?",
    realizeDate: "2021",
    authorId: "yosivoni",
    _id: "vzletayaVisoko",
  });
};

exports.getBooks = (req: express.Request, res: express.Response) => {
  try {
    db.books
      .find()
      .sort({ updatedAt: -1 })
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
exports.getBooksById = (req: express.Request, res: express.Response) => {
  const _id = req.params.id;
  try {
    db.books
      .findById({ _id })
      .sort({ updatedAt: -1 })
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
exports.setBooks = (req: express.Request, res: express.Response) => {
  try {
    const bookList = new db.books({
      img: req.body.img,
      title: req.body.title,
      content: req.body.content,
      realizeDate: req.body.realizeDate,
    });

    bookList
      .save()
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));

    res.send({ status: "OK" });
  } catch (e) {
    console.log(e);
    res.send({ status: "ERROR" });
  }
};
exports.updateBooksById = (req: express.Request, res: express.Response) => {
  try {
    const id = req.body.id;
    db.books
      .findByIdAndUpdate({ _id: id }, req.body.payload)
      .then(() =>
        db.books.findOne({ _id: id }).then(() => res.send({ status: "OK" }))
      );
  } catch (e) {
    console.log(e);
  }
};
exports.deleteBooksById = (req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id;
    db.books.findByIdAndDelete({ _id: id }).then(() => {
      res.send({ status: "OK" });
    });
  } catch (e) {
    console.log(e);
  }
};
