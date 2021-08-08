const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// update user
router.put("/:id", async (req, res) => {
  if (req.body.id == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(4);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.json(err);
    }
  } else {
    return res.json("you can not update user");
  }
});
// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.id == req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("user deleted");
    } catch (err) {
      return res.json(err);
    }
  } else {
    return res.json("you can not delete user");
  }
});
// get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, createdAt, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.json(err);
  }
});
// follow user
router.put("/:id/follow", async (req, res) => {
  const { id: curentUserId } = req.body;
  const { id: followedId } = req.params;
  if (curentUserId !== followedId) {
    try {
      const followedUser = await User.findById(followedId);
      const curentUser = await User.findById(curentUserId);
      console.log(followedUser, curentUser);
      if (!followedUser.followers.includes(curentUserId)) {
        await followedUser.updateOne({ $push: { followers: curentUserId } });
        await curentUser.updateOne({ $push: { following: followedId } });
        res.status(200).json("user has been followed");
      } else {
        return res.json("you alredy followed");
      }
    } catch (error) {
      return res.json(error);
    }
  } else {
    return res.json("you can not follow yourself");
  }
});

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  const { id: curentUserId } = req.body;
  const { id: followedId } = req.params;
  if (curentUserId !== followedId) {
    try {
      const followedUser = await User.findById(followedId);
      const curentUser = await User.findById(curentUserId);
      console.log(followedUser, curentUser);
      if (followedUser.followers.includes(curentUserId)) {
        await followedUser.updateOne({ $pull: { followers: curentUserId } });
        await curentUser.updateOne({ $pull: { following: followedId } });
        res.status(200).json("user has been unfollowed");
      } else {
        return res.json("you alredy unfollowed");
      }
    } catch (error) {
      return res.json(error);
    }
  } else {
    return res.json("you can not unfollow yourself");
  }
});

module.exports = router;
