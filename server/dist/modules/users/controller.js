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
const jwt = require("jsonwebtoken");
const saltRounds = 10;
exports.passportLogin = (req, res) => {
    const user = {
        JWT: req.user.JWT,
        user: req.user.data,
    };
    res.status(200).send(user);
};
exports.authenticateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.sendStatus(403);
        if (data) {
            const user = yield db.users.findById({ _id: data.id });
            if (user) {
                res.status(200).send(user);
            }
        }
    }));
});
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
                const result = yield db.users.findOne({
                    username: String(profile.data.name).toLowerCase(),
                });
                if (result) {
                    res.status(200).send(profile.data);
                }
                else {
                    res.status(401).send();
                }
            }
        }
        if (provider === "github") {
            const profile = yield axios_1.default.get("https://cors-anywhere.herokuapp.com/https://api.github.com/user", {
                headers: {
                    Authorization: `token ${token}`,
                    origin: "localhost:3000/checkUser",
                },
            });
            if (profile.status === 200) {
                console.log("profile.data", profile.data);
                const result = yield db.users.findOne({
                    username: String(profile.data.login).toLowerCase(),
                });
                console.log(result);
                if (result) {
                    res.status(200).send(result);
                }
                else {
                    res.status(401).send();
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});
//# sourceMappingURL=controller.js.map