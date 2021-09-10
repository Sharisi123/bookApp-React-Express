import express from "express";

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoDB = require("./mongoDB");

const booksRouter = require("./modules/books/");
const authorsRouter = require("./modules/authors");
const usersRouter = require("./modules/users");

const LocalStrategy = require("./modules/users").LocalStrategy;
const GoogleStrategy = require("./modules/users").GoogleStrategy;
const GitHubStrategy = require("./modules/users").GitHubStrategy;

const jwt = require("./_helpers/jwt");

const port = process.env.PORT || 4200;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(jwt());

passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(GitHubStrategy);

app.use("/api", booksRouter.router);
app.use("/api", authorsRouter.router);
app.use("/api/users", usersRouter.router);

mongoDB();

app.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});
