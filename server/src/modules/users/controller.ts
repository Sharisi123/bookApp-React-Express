const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const findUser = async (username: string, callback: any) => {
  try {
    const result = await db.users.findOne({ username: username });

    return callback("", result);
  } catch (err) {
    return callback(err.message, null);
  }
};

exports.passportLogin = (req: any, res: any) => {
  res.status(200).send({ message: "login successful" });
};

exports.register = async (req: any, res: any) => {
  try {
    const { password, username } = req.body;

    const result = await db.users.findOne({ username });

    if (result) throw new Error("this username already exist");

    await bcrypt.hash(password, saltRounds, async (err: any, hash: any) => {
      await db.users.create({
        ...req.body,
        username: username,
        password: hash,
      });
    });

    res.status(200).send({ message: "user created" });
  } catch (err) {
    res.send({ message: err.message });
    console.log(err);
  }
};

exports.localStrategy = new LocalStrategy(
  (username: any, password: any, done: any) => {
    findUser(username, (err: any, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err: any, result: any) => {
        if (!result) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    });
  }
);
