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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BookList = require("./models/bookList");
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const port = 4200;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect("mongodb+srv://alex:1q2w3e4r@cluster0.pnaky.mongodb.net/books", {
            // @ts-ignore
            useNewUrlParser: true,
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
app.get("/api/books", (req, res) => {
    try {
        BookList.find()
            .sort({ updatedAt: -1 })
            .then((result) => res.send(result))
            .catch((e) => console.log(e));
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/api/create", (req, res) => {
    try {
        const bookList = new BookList({
            img: req.body.img,
            title: req.body.title,
            content: req.body.content,
            realizeDate: req.body.realizeDate,
        });
        bookList
            .save()
            .then((result) => res.send(result))
            .catch((e) => console.log(e));
        res.send({ status: "OK" });
    }
    catch (e) {
        console.log(e);
        res.send({ status: "ERROR" });
    }
});
app.put("/api/update", (req, res) => {
    try {
        const id = req.body.id;
        BookList.findByIdAndUpdate({ _id: id }, req.body.payload).then(() => BookList.findOne({ _id: id }).then(() => res.send({ status: "OK" })));
    }
    catch (e) {
        console.log(e);
    }
});
app.delete("/api/delete", (req, res) => {
    try {
        const id = req.query.id;
        BookList.findByIdAndDelete({ _id: id }).then(() => {
            res.send({ status: "OK" });
        });
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(port, () => {
    console.log(`Server starts on port http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map