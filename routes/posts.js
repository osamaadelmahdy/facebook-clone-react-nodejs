const express = require("express");
const bcrypt = require("bcryptjs");
const Post = require("../models/post");
const User = require("../models/User");

const router = express.Router();

// create post
router.post("/", async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    return res.json(error);
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.json("post updated");
    } else {
      return res.json("you can update only your posts ");
    }
  } catch (error) {
    return res.json(error);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.json("post deleted");
    } else {
      return res.json("you can delete only your posts ");
    }
  } catch (error) {
    return res.json(error);
  }
});

// like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.json("you liked the post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.json("you disliked the post");
    }
  } catch (error) {
    return res.json(error);
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    return res.json(error);
  }
});

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    console.log("currentUser", currentUser);
    const userPosts = await Post.find({ userId: currentUser._id });
    console.log("userPosts", userPosts);
    friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    console.log("friendsPosts", friendsPosts);
    res.json(userPosts.concat(...friendsPosts));
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
