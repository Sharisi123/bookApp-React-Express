"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose_1.default.Schema;
const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
loginSchema.plugin(passportLocalMongoose);
const Login = mongoose_1.default.model("login", loginSchema);
module.exports = Login;
//# sourceMappingURL=login.js.map