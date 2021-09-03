require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const saltRounds = process.env.BCRYPT_SALTROUNDS || 10;

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

exports.LocalStrategy = new LocalStrategy(
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

const findOrCreateGoogleUser = async (profile: any, callback: any) => {
  try {
    const result = await db.googleUsers.findById({ _id: profile.id });
    if (!result) {
      const createdGoogleUser = await db.googleUsers.create({
        _id: profile.id,
        displayName: profile._json.name,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        picture: profile._json.picture,
        role: "Reader",
      });
      return callback(null, createdGoogleUser);
    } else {
      return callback(null, result);
    }
  } catch (err) {
    console.log(err.message);
    return callback(err.message, null);
  }
};

exports.GoogleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4200",
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    findOrCreateGoogleUser(profile, (err: string, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
);
