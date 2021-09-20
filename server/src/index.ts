require("dotenv").config();

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);

const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoDB = require("./mongoDB");
const jwt = require("./_helpers/jwt");
const socketJwt = require("./_helpers/socketJwt");
const path = require("path");

const booksRouter = require("./modules/books/");
const authorsRouter = require("./modules/authors");
const usersRouter = require("./modules/users");
const chatsHandler = require("./modules/chats");

const LocalStrategy = require("./modules/users").LocalStrategy;
const GoogleStrategy = require("./modules/users").GoogleStrategy;
const GitHubStrategy = require("./modules/users").GitHubStrategy;

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["authorization"],
    credentials: true,
  },
});

const port = process.env.PORT || 5001;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(jwt());

io.use((socket: any, next: any) => {
  console.log("socket jwt is work");

  const header = socket.handshake.headers["authorization"];
  if (jwt(header)) {
    return next();
  }
  return next(new Error("authentication error"));
});

passport.use(LocalStrategy);
passport.use(GoogleStrategy);
passport.use(GitHubStrategy);

app.use("/api", booksRouter.router);
app.use("/api", authorsRouter.router);
app.use("/api/users", usersRouter.router);
app.use("/api", chatsHandler.router);

mongoDB();

io.on("connection", chatsHandler.onConnect);

httpServer.listen(port, () => {
  console.log(`Server starts on port http://localhost:${port}`);
});

export {};

// app.use(express.static(path.resolve(__dirname, "../client/build")));
// // Step 2:
// app.get("*", (request, response) => {
//   console.log(__dirname);

//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
