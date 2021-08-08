const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  console.log("req heder", req.header("X-Auth-Token"));
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(401).send("unauthorized .");

  try {
    const user = jwt.verify(token, config.SECRET_KEY);
    req.user = await User.findById(user._id);
    next();
  } catch (error) {
    return res.status(401).send("invalid token .");
  }
};
