import mongoose from "mongoose";
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const googleUserSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

googleUserSchema.plugin(passportLocalMongoose);

const googleUsers = mongoose.model("googleUsers", googleUserSchema);

module.exports = googleUsers;
