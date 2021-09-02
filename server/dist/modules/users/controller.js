var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const findUser = (username, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield db.users.findOne({ username: username });
        return callback("", result);
    }
    catch (err) {
        return callback("user not found", null);
    }
});
exports.passportLogin = (req, res) => {
    res.status(200).send({ message: "login successful" });
};
exports.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { password, username } = req.body;
        const result = yield db.users.findOne({ username });
        if (result)
            throw new Error("this username already exist");
        yield bcrypt.hash(password, saltRounds, (err, hash) => __awaiter(this, void 0, void 0, function* () {
            yield db.users.create(Object.assign(Object.assign({}, req.body), { username: username, password: hash }));
        }));
        res.status(200).send({ message: "user created" });
    }
    catch (err) {
        res.send({ message: err.message });
        console.log(err);
    }
});
exports.localStrategy = new LocalStrategy((username, password, done) => {
    findUser(username, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        });
    });
});
//# sourceMappingURL=controller.js.map