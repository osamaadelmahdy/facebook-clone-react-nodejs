const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);