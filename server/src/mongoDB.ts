const mongoose = require("mongoose");

module.exports = mongoDB;

async function mongoDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/books`,
      {
        // @ts-ignore
        useNewUrlParser: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
}
