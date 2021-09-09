require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const generateToken = require("../generateToken");

const findUser = async (username: string, callback: any) => {
  try {
    const result = await db.users.findOne({ username: username });

    return callback("", result);
  } catch (err) {
    return callback(err.message, null);
  }
};

exports.LocalStrategy = new LocalStrategy(
  (username: any, password: any, done: any) => {
    findUser(username, (err: any, user: any) => {
      const id = user._doc._id.toString();
      const JWT = generateToken({ id });

      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const result = bcrypt.compare(password, user.password);

      if (!result) {
        return done(null, false);
      } else {
        return done(null, { JWT, data: user._doc });
      }
    });
  }
);

export {};
