"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.authors.find().sort({ updatedAt: -1 });
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.setNewAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    try {
        const result = yield db.authors.create(Object.assign({}, req.body));
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});
exports.getAuthorsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const result = yield db.authors.findById({ _id }).sort({ updatedAt: -1 });
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.updateAuthorBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const result = yield db.authors
            .findByIdAndUpdate({ _id }, { $push: { books: req.body.bookId } })
            .sort({ updatedAt: -1 });
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//# sourceMappingURL=controller.js.map