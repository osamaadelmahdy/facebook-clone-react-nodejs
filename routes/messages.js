const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newMessage = await new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
