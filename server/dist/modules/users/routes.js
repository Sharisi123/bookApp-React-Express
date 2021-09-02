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
module.exports = router;
//# sourceMappingURL=routes.js.map