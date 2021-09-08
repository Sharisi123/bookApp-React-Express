import axios from "axios";

require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.passportLogin = (req: any, res: any) => {
  res.status(200).send({ message: "login successful" });
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
        res.status(200).send(profile.data);
      }
    }
    if (provider === "github") {
      const profile = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.github.com/user`,
        {
          headers: {
            Authorization: `token ${token}`,
            origin: "localhost:3000/checkUser",
          },
        }
      );

      if (profile.status === 200) {
        res.status(200).send(profile.data);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export {};
