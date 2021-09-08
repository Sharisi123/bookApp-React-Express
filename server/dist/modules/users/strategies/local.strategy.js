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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const findUser = (username, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.users.findOne({ username: username });
        return callback("", result);
    }
    catch (err) {
        return callback(err.message, null);
    }
});
exports.LocalStrategy = new LocalStrategy((username, password, done) => {
    findUser(username, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        const result = bcrypt.compare(password, user.password);
        if (!result) {
            return done(null, false);
        }
        else {
            return done(null, user);
        }
    });
});
//# sourceMappingURL=local.strategy.js.map