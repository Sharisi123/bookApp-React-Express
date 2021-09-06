"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const loginController = require("./controller");
const router = express_1.default.Router();
router.post("/login", passport.authenticate("local"), loginController.passportLogin);
router.post("/register", loginController.register);
router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
}));
router.get("/google/callback", loginController.googleCallback);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", loginController.githubCallback);
module.exports = router;
//# sourceMappingURL=routes.js.map