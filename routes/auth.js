const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(4);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(erorr);
  }
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(404).json("password not match");
    return res.status(200).json(user);
  } catch (error) {
    console.log(erorr);
    return res.status(500).json(erorr);
  }
});

// router.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username) return res.status(400).send("user name is require");
//   if (!password) return res.status(400).send("password is require");
//   const user = await User.findOne({ username });
//   console.log(user);
//   if (!user) return res.status(404).send("user dos not exist");

//   const isMatch = await user.checkPassword(password);
//   console.log(isMatch);
//   if (!isMatch) return res.status(404).send("password dos not match");
//   console.log(isMatch);
//   return res.send(user.genAuthToken());
// });

module.exports = router;
