var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const url = require("url");
const saltRounds = 10;
exports.passportLogin = (req, res) => {
    res.status(200).send({ message: "login successful" });
};
exports.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { password, username } = req.body;
        const result = yield db.users.findOne({ username });
        if (result)
            throw new Error("this username already exist");
        const hash = bcrypt.hash(password, saltRounds);
        yield db.users.create(Object.assign(Object.assign({}, req.body), { username, password: hash }));
    }
    catch (err) {
        res.send({ message: err.message });
        console.log(err);
    }
});
const findUser = (username, callback) => __awaiter(this, void 0, void 0, function* () {
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
const findOrCreateGoogleUser = (profile, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield db.googleUsers.findById({ _id: profile.id });
        if (!result) {
            const createdGoogleUser = yield db.googleUsers.create({
                _id: profile.id,
                displayName: profile._json.name,
                firstName: profile._json.given_name,
                lastName: profile._json.family_name,
                picture: profile._json.picture,
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
}, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
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
        return !err
            ? user
                ? res.redirect(url.format({
                    pathname: process.env.REACT_APP_HOST,
                    query: { token: user.accessToken },
                }))
                : res.status(500).send({ message: "cant find or create user" })
            : res.status(500).send({ message: err });
    })(req, res, next);
};
exports.GitHubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/github/callback`,
}, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const findResult = yield db.users.findOne({ username: profile.username });
        console.log("find Results", findResult);
        if (!findResult) {
            const createResult = yield db.users.create({
                provider: "github",
                username: profile.username,
                email: "test@test.com",
                firstName: profile._json.name.split(" ")[0],
                lastName: profile._json.name.split(" ")[1],
                role: "Reader",
            });
            console.log("created User", createResult);
            return done(null, Object.assign({ accessToken }, createResult));
        }
        else {
            return done(null, Object.assign({ accessToken }, findResult));
        }
    }
    catch (err) {
        console.log(err);
        return done(err.message, false);
    }
}));
exports.githubCallback = (req, res, next) => {
    passport.authenticate("github", (err, user) => {
        console.log("error", err);
        console.log("user", user.accessToken);
        // @ts-ignore
        if (!err & !!user) {
            return res.redirect(url.format({
                pathname: process.env.REACT_APP_HOST,
                query: { token: user.accessToken },
            }));
        }
        else {
            return res.status(500).send({ message: "error" });
        }
    })(req, res, next);
};
//# sourceMappingURL=controller.js.map