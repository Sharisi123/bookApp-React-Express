require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoDB;

async function mongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      // @ts-ignore
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
}

export {};
