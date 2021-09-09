const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = generateToken;

function generateToken(id: any) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "7h" });
}
