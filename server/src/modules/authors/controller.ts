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

exports.getAuthors = async (req: express.Request, res: express.Response) => {
  try {
    const result = await db.authors.find().sort({ updatedAt: -1 });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.setNewAuthor = async (req: express.Request, res: express.Response) => {
  console.log("req.body", req.body);

  try {
    const result = await db.authors.create({
      ...req.body,
    });

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.getAuthorsById = async (
  req: express.Request,
  res: express.Response
) => {
  const _id = req.params.id;
  try {
    const result = await db.authors.findById({ _id }).sort({ updatedAt: -1 });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateAuthorBooks = async (
  req: express.Request,
  res: express.Response
) => {
  const _id = req.params.id;
  try {
    const result = await db.authors
      .findByIdAndUpdate({ _id }, { $push: { books: req.body.bookId } })
      .sort({ updatedAt: -1 });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
