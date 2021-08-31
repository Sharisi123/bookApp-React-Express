import express from "express";

const db = require("./models");

exports.createAuthor = () => {
  db.authors.create({
    firstName: "Бьянка",
    lastName: "Йосовони",
    email: "testMain@gmail.com",
    phoneNumber: "+62321304343",
    booksCount: "1",
    books: ["vzletayaVisoko"],
    _id: "yosivoni",
  });
};

exports.getAuthors = (req: express.Request, res: express.Response) => {
  try {
    db.authors
      .find()
      .sort({ updatedAt: -1 })
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
exports.getAuthorsById = (req: express.Request, res: express.Response) => {
  const _id = req.params.id;
  try {
    db.authors
      .findById({ _id })
      .sort({ updatedAt: -1 })
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
