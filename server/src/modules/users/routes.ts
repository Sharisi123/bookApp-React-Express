import express from "express";

const passport = require("passport");
const loginController = require("./controller");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local"),
  loginController.passportLogin
);

router.post("/register", loginController.register);

module.exports = router;
