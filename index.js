const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const path = require("path");
const multer = require("multer");

const usersRouter = require("./routes/users");
const auth = require("./routes/auth");
const postsRouter = require("./routes/posts");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "celint/public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error("err", error);
  }
});

app.use("/api/users", usersRouter);
app.use("/api/auth", auth);
app.use("/api/posts", postsRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err))
  .then((c) => console.log("connected to mongoDB"));

app.listen("8080", () => {
  console.log("backend server is running");
});

// app.use("/api/products", product);
// app.use("/api/cart", cart);
// const product = require("./routes/product");
// const cart = require("./routes/cart");
