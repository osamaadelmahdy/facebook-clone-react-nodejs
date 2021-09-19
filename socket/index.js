const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => {
    user.socketId !== socketId;
  });
};

const getUser = (userId) => {
  const u = users.find((user) => {
    return user.userId === userId;
  });
  console.log(u);
  return u;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId) => {
    console.log("addUser");
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("sendMessage", senderId, receiverId, text);
    const user = getUser(receiverId);
    console.log(users);
    console.log(user);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
});
