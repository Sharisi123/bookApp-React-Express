require("dotenv").config();
const db = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

exports.passportLogin = (req: any, res: any) => {
  const user = {
    token: req.user.token,
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

export {};
