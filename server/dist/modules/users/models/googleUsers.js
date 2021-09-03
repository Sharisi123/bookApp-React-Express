"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose_1.default.Schema;
const googleUserSchema = new Schema({
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
}, { timestamps: true });
googleUserSchema.plugin(passportLocalMongoose);
const googleUsers = mongoose_1.default.model("googleUsers", googleUserSchema);
module.exports = googleUsers;
//# sourceMappingURL=googleUsers.js.map