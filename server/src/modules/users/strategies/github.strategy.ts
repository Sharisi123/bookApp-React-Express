require("dotenv").config();
const db = require("../models");
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const url = require("url");

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
      const findResult = await db.users.findOne({
        username: String(profile.username).toLowerCase(),
      });

      if (!findResult) {
        const createResult = await db.users.create({
          token: accessToken,
          provider: "github",
          username: String(profile.username).toLowerCase(),
          email: "test@test.com",
          firstName: profile._json.name.split(" ")[0],
          lastName: profile._json.name.split(" ")[1],
          role: "Reader",
        });
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
    // @ts-ignore
    if (!err & !!user) {
      return res.redirect(
        url.format({
          pathname: `${process.env.REACT_APP_HOST}/checkUser`,
          query: { token: user.accessToken, provider: "github" },
        })
      );
    } else {
      return res.status(500).send({ message: err ?? "server error" });
    }
  })(req, res, next);
};

export {};
