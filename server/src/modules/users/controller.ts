import axios from "axios";

require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

exports.passportLogin = (req: any, res: any) => {
  const user = {
    JWT: req.user.JWT,
    user: req.user.data,
  };
  res.status(200).send(user);
};

exports.authenticateToken = async (req: any, res: any) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, data: any) => {
      if (err) return res.sendStatus(403);

      if (data) {
        const user = await db.users.findById({ _id: data.id });

        if (user) {
          res.status(200).send(user);
        }
      }
    }
  );
};

exports.register = async (req: any, res: any) => {
  try {
    const { password, username } = req.body;

    const result = await db.users.findOne({ username });
    if (result) throw new Error("this username already exist");

    const hash = await bcrypt.hash(password, saltRounds);

    await db.users.create({
      ...req.body,
      username,
      password: hash,
    });
    res.status(200).send("User registered");
  } catch (err) {
    res.send({ message: err.message });
    console.log(err);
  }
};

exports.getUser = async (req: any, res: any) => {
  const { token, provider } = req.query;

  try {
    if (provider === "google") {
      const profile = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token
      );

      if (profile.status === 200) {
        const result = await db.users.findOne({
          username: String(profile.data.name).toLowerCase(),
        });
        if (result) {
          res.status(200).send(profile.data);
        } else {
          res.status(401).send();
        }
      }
    }
    if (provider === "github") {
      const profile = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.github.com/user",
        {
          headers: {
            Authorization: `token ${token}`,
            origin: "localhost:3000/checkUser",
          },
        }
      );

      if (profile.status === 200) {
        const result = await db.users.findOne({
          username: String(profile.data.login).toLowerCase(),
        });

        if (result) {
          res.status(200).send(result);
        } else {
          res.status(401).send();
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export {};
