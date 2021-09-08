require("dotenv").config();
const db = require("../models");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
const url = require("url");

const findOrCreateGoogleUser = async (profile: any, callback: any) => {
  try {
    const result = await db.users.findOne({
      username: String(profile._json.name).toLowerCase(),
    });

    if (!result) {
      const createdGoogleUser = await db.users.create({
        token: profile.accessToken,
        provider: "google",
        username: String(profile._json.name).toLowerCase(),
        email: "test@mail.com",
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
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
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/google/callback`,
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    const data = {
      accessToken,
      ...profile,
    };

    findOrCreateGoogleUser(data, (err: string, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const payload = {
        accessToken,
        ...user,
      };
      return done(null, payload);
    });
  }
);

exports.googleCallback = (req: any, res: any, next: any) => {
  passport.authenticate("google", { session: false }, (err: any, user: any) => {
    if (!err && !!user) {
      return res.redirect(
        url.format({
          pathname: `${process.env.REACT_APP_HOST}/checkUser`,
          query: { token: user.accessToken, provider: "google" },
        })
      );
    } else {
      res.status(500).send({ message: err ?? "server error" });
    }
  })(req, res, next);
};

export {};
