import express from "express";

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { connectMongoDB } = require("./connectMongoDB");

const db = require("./modules/login/models");

const booksRouter = require("./modules/books/");
const authorsRouter = require("./modules/authors");
const usersRouter = require("./modules/users");

const LocalStrategy = require("./modules/users").LocalStrategy;
const GoogleStrategy = require("./modules/users").GoogleStrategy;
const GitHubStrategy = require("./modules/users").GitHubStrategy;

const port = process.env.PORT || 4200;

const app = express();

app.use(cors());
app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(GitHubStrategy);

passport.serializeUser(db.login.serializeUser());
passport.deserializeUser(db.login.deserializeUser());

app.use("/api", booksRouter.router);
app.use("/api", authorsRouter.router);
app.use("/api/users", usersRouter.router);

connectMongoDB();

app.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});
