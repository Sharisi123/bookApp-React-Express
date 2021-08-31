import express from "express";

require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const booksRouter = require(".modules/books");
const authorsRouter = require(".modules/authors");

const port = process.env.PORT;

const app = express();
app.set("base", "api/");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.NODE_MONGODB_USERNAME}:${process.env.NODE_MONGODB_PASSWORD}@cluster0.pnaky.mongodb.net/books`,
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

app.use("/users", booksRouter);
app.use("/authors", authorsRouter);

app.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});
