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
exports.createBook = () => {
    db.books.create({
        img: "http://loveread.ec/img/photo_books/88525.jpg",
        title: "Быстро падая",
        content: "Хейли уверена: это лето изменит ее жизнь. Она бросит вызов своим страхам и отправится в путешествие, чтобы выполнить данное лучшему другу обещание и наконец стать собой – смелой Хейли. Вот только все идет не по плану. Машина ломается, деньги заканчиваются, а ее новый знакомый, Чейз Уиттакер, кажется, влюбляется в нее!",
        realizeDate: "2020",
        authorId: "yosivoni",
        _id: "bistroPadaya",
    });
};
exports.getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.books.find().sort({ updatedAt: -1 });
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.getBooksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const result = yield db.books.findById({ _id }).sort({ updatedAt: -1 });
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.setBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookList = new db.books(Object.assign({}, req.body));
        const result = yield bookList.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.updateBooksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.books.findByIdAndUpdate({ _id: req.body.payload.id }, req.body.payload);
        yield db.books.findOne({ _id: req.body.payload.id });
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.deleteBooksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.query.id;
        yield db.books.findByIdAndDelete({ _id });
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//# sourceMappingURL=controller.js.map