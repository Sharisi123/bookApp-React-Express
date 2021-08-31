"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.getAuthors = (req, res) => {
    db.authors
        .find()
        .sort({ updatedAt: -1 })
        .then((result) => res.send(result))
        .catch((e) => {
        res.send({ status: "ERROR" });
        console.log(e);
    });
};
exports.getAuthorsById = (req, res) => {
    const _id = req.params.id;
    db.authors
        .findById({ _id })
        .sort({ updatedAt: -1 })
        .then((result) => res.send(result))
        .catch((e) => {
        res.send({ status: "ERROR" });
        console.log(e);
    });
};
exports.updateAuthorBooks = (req, res) => {
    const _id = req.params.id;
    console.log(req.body);
    console.log(_id);
    db.authors
        .findByIdAndUpdate({ _id }, { $push: { books: req.body.bookId } })
        .sort({ updatedAt: -1 })
        .then((result) => res.send(result))
        .catch((e) => {
        res.send({ status: "ERROR" });
        console.log(e);
    });
};
//# sourceMappingURL=controller.js.map