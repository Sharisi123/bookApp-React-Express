import express from "express";

const db = require("./models");

exports.getBooks = async (req: express.Request, res: express.Response) => {
  try {
    const result = await db.books.find().sort({ updatedAt: -1 });

    res.send(result);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
};
exports.getBooksById = async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const result = await db.books.findById({ _id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    logger.error(err);
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
    logger.error(err);
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
    logger.error(err);
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
    logger.error(err);
    res.status(500).send(err.message);
  }
};
