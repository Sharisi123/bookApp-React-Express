"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { connectMongoDB } = require("./connectMongoDB");
const booksRouter = require("./modules/books/");
const authorsRouter = require("./modules/authors");
const usersRouter = require("./modules/users");
const LocalStrategy = require("./modules/users").LocalStrategy;
const GoogleStrategy = require("./modules/users").GoogleStrategy;
const GitHubStrategy = require("./modules/users").GitHubStrategy;
const jwt = require("./_helpers/jwt");
const port = process.env.PORT || 4200;
const app = (0, express_1.default)();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(jwt());
passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(GitHubStrategy);
app.use("/api", booksRouter.router);
app.use("/api", authorsRouter.router);
app.use("/api/users", usersRouter.router);
connectMongoDB();
app.listen(port, () => {
    console.log(`Server starts on port http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map