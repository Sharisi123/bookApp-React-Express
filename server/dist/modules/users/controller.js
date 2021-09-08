"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.passportLogin = (req, res) => {
    res.status(200).send({ message: "login successful" });
};
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, username } = req.body;
        const result = yield db.users.findOne({ username });
        if (result)
            throw new Error("this username already exist");
        const hash = yield bcrypt.hash(password, saltRounds);
        yield db.users.create(Object.assign(Object.assign({}, req.body), { username, password: hash }));
        res.status(200).send("User registered");
    }
    catch (err) {
        res.send({ message: err.message });
        console.log(err);
    }
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, provider } = req.query;
    try {
        if (provider === "google") {
            const profile = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token);
            if (profile.status === 200) {
                res.status(200).send(profile.data);
            }
        }
        if (provider === "github") {
            const profile = yield axios_1.default.get(`https://cors-anywhere.herokuapp.com/https://api.github.com/user`, {
                headers: {
                    Authorization: `token ${token}`,
                    origin: "localhost:3000/checkUser",
                },
            });
            if (profile.status === 200) {
                res.status(200).send(profile.data);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});
//# sourceMappingURL=controller.js.map