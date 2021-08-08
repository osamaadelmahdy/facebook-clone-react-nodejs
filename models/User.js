const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    disc: { type: String, default: "" },
    city: { type: String, default: "" },
    from: { type: String, default: "" },
    relationship: { type: Number, enum: [1, 2, 3], default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
