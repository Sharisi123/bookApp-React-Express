import express from "express";
const passport = require("../../_helpers/passport");
const authController = require("./controller");
const githubController = require("./strategies/github.strategy");
const googleController = require("./strategies/google.strategy");

const router = express.Router();

router.post("/authenticate", authController.authenticateToken);

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  authController.passportLogin
);

router.post("/register", authController.register);

// GOOGLE

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get("/google/callback", googleController.googleCallback);

// GITHUB

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github/callback", githubController.githubCallback);

module.exports = router;
