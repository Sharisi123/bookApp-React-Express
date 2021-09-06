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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get("/google/callback", loginController.googleCallback);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback", loginController.githubCallback);

module.exports = router;
