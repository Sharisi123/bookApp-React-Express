import express from "express";

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BookList = require("./models/bookList");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = 4200;

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alex:1q2w3e4r@cluster0.pnaky.mongodb.net/books",
      {
        // @ts-ignore
        useNewUrlParser: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
};
start();

app.get("/api/books", (req: express.Request, res: express.Response) => {
  try {
    BookList.find()
      .sort({ updatedAt: -1 })
      .then((result: any) => res.send(result))
      .catch((e: any) => console.log(e));
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/create", (req: express.Request, res: express.Response) => {
  try {
    const bookList = new BookList({
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
});

app.put("/api/update", (req: express.Request, res: express.Response) => {
  try {
    const id = req.body.id;
    BookList.findByIdAndUpdate({ _id: id }, req.body.payload).then(() =>
      BookList.findOne({ _id: id }).then(() => res.send({ status: "OK" }))
    );
  } catch (e) {
    console.log(e);
  }
});

app.delete("/api/delete", (req: express.Request, res: express.Response) => {
  try {
    const id = req.query.id;
    BookList.findByIdAndDelete({ _id: id }).then(() => {
      res.send({ status: "OK" });
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});
