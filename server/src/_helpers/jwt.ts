const jwt = require("express-jwt");
require("dotenv").config();

module.exports = authMiddleware;

function authMiddleware() {
  const secret = process.env.TOKEN_SECRET;
  return jwt({
    secret,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req: any, res: any) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return null;
    },
  }).unless({
    path: [
      "api/users",
      "api/users/",
      "api/users/authorize",
      "api/users/login",
      "api/users/register",
      "api/users/google",
      "api/users/google/callback",
      "api/users/github",
      "api/users/github/callback",
    ],
  });
}

export {};
