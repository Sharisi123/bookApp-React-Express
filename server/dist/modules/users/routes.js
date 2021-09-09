"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const authController = require("./controller");
const githubController = require("./strategies/github.strategy");
const googleController = require("./strategies/google.strategy");
const router = express_1.default.Router();
router.get("/", authController.getUser);
router.post("/authenticate", authController.authenticateToken);
router.post("/login", passport.authenticate("local", {
    session: false,
}), authController.passportLogin);
router.post("/register", authController.register);
// GOOGLE
router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
}));
router.get("/google/callback", googleController.googleCallback);
// GITHUB
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", githubController.githubCallback);
module.exports = router;
//# sourceMappingURL=routes.js.map