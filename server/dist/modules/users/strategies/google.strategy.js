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
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("../../../_helpers/passport");
const url = require("url");
const generateToken = require("../generateToken");
const findOrCreateGoogleUser = (profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.users.findOne({
            username: String(profile._json.name).toLowerCase(),
        });
        if (!result) {
            const createdGoogleUser = yield db.users.create({
                provider: "google",
                username: String(profile._json.name).toLowerCase(),
                email: "test@mail.com",
                firstName: profile._json.given_name,
                lastName: profile._json.family_name,
                role: "Reader",
            });
            return callback(null, createdGoogleUser);
        }
        else {
            return callback(null, result);
        }
    }
    catch (err) {
        console.log(err.message);
        return callback(err.message, null);
    }
});
exports.GoogleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/google/callback`,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    findOrCreateGoogleUser(profile, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        const payload = Object.assign({ accessToken }, user);
        return done(null, payload);
    });
}));
exports.googleCallback = (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user) => {
        const id = user._doc._id.toString();
        const token = generateToken({ id });
        if (!err && !!user) {
            return res.redirect(url.format({
                pathname: `${process.env.REACT_APP_HOST}/checkUser`,
                query: { token },
            }));
        }
        else {
            res.status(500).send({ message: err !== null && err !== void 0 ? err : "server error" });
        }
    })(req, res, next);
};
//# sourceMappingURL=google.strategy.js.map