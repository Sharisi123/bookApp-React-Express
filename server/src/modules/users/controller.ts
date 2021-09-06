require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const url = require("url");

const saltRounds = 10;

exports.passportLogin = (req: any, res: any) => {
  res.status(200).send({ message: "login successful" });
};

exports.register = async (req: any, res: any) => {
  try {
    const { password, username } = req.body;

    const result = await db.users.findOne({ username });
    if (result) throw new Error("this username already exist");

    const hash = bcrypt.hash(password, saltRounds);

    await db.users.create({
      ...req.body,
      username,
      password: hash,
    });
  } catch (err) {
    res.send({ message: err.message });
    console.log(err);
  }
};

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
        return done(null, user);
      }
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
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/google/callback`,
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    findOrCreateGoogleUser(profile, (err: string, user: any) => {
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
    return !err
      ? user
        ? res.redirect(
            url.format({
              pathname: process.env.REACT_APP_HOST,
              query: { token: user.accessToken },
            })
          )
        : res.status(500).send({ message: "cant find or create user" })
      : res.status(500).send({ message: err });
  })(req, res, next);
};

exports.GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_APP_HOST}/api/users/github/callback`,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    try {
      const findResult = await db.users.findOne({ username: profile.username });
      console.log("find Results", findResult);

      if (!findResult) {
        const createResult = await db.users.create({
          provider: "github",
          username: profile.username,
          email: "test@test.com",
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1],
          role: "Reader",
        });
        console.log("created User", createResult);
        return done(null, {
          accessToken,
          ...createResult,
        });
      } else {
        return done(null, {
          accessToken,
          ...findResult,
        });
      }
    } catch (err) {
      console.log(err);
      return done(err.message, false);
    }
  }
);

exports.githubCallback = (req: any, res: any, next: any) => {
  passport.authenticate("github", (err: any, user: any) => {
    console.log("error", err);
    console.log("user", user.accessToken);

    // @ts-ignore
    if (!err & !!user) {
      return res.redirect(
        url.format({
          pathname: process.env.REACT_APP_HOST,
          query: { token: user.accessToken },
        })
      );
    } else {
      return res.status(500).send({ message: "error" });
    }
  })(req, res, next);
};
