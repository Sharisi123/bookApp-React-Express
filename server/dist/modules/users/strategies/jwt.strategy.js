"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");
const opts = {
    payload: {
        id: "123123",
    },
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;
exports.JWTStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
    const user = db.users.findOne({ _id: jwt_payload.id });
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
        // or you could create a new account
    }
});
//# sourceMappingURL=jwt.strategy.js.map