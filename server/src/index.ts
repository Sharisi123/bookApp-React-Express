import express from "express";

require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const booksRouter = require("./modules/books/");
const authorsRouter = require("./modules/authors");

// const createAuthor = require("./modules/authors/controller");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// createAuthor.createAuthor();

app.use("/api", booksRouter.router);
app.use("/api", authorsRouter.router);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/books`,
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

app.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});
