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
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("../../../_helpers/passport");
const url = require("url");
const generateToken = require("../generateToken");
exports.GitHubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/github/callback`,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findResult = yield db.users.findOne({
            username: String(profile.username).toLowerCase(),
        });
        if (!findResult) {
            const createResult = yield db.users.create({
                provider: "github",
                username: String(profile.username).toLowerCase(),
                email: "test@test.com",
                firstName: profile._json.name.split(" ")[0],
                lastName: profile._json.name.split(" ")[1],
                role: "Reader",
            });
            return done(null, Object.assign({ accessToken }, createResult));
        }
        else {
            return done(null, Object.assign({ accessToken }, findResult));
        }
    }
    catch (err) {
        console.log(err.message);
        return done(err.message, false);
    }
}));
exports.githubCallback = (req, res, next) => {
    passport.authenticate("github", (err, user) => {
        if (!err && !!user) {
            const id = user._doc._id.toString();
            const token = generateToken({ id });
            return res.redirect(url.format({
                pathname: `${process.env.REACT_APP_HOST}/checkUser`,
                query: { token },
            }));
        }
        else {
            return res.status(500).send({ message: err !== null && err !== void 0 ? err : "server error" });
        }
    })(req, res, next);
};
//# sourceMappingURL=github.strategy.js.map