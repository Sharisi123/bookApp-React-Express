import express from "express";
import { nextTick } from "process";

const passport = require("passport");
const loginController = require("./controller");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local"),
  loginController.passportLogin
);

router.post("/register", loginController.register);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err: any, user: any) => {
    return !err
      ? user
        ? res.status(200).send(user)
        : res.status(500).send({ message: "cant find or create user" })
      : res.status(500).send({ message: err });
  })(req, res, next);
});

module.exports = router;
