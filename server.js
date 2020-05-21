const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const users = {};

app.use(cors());


app.use(express.static(__dirname + "/dist/chat"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/chat/index.html"));
});

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", createAnswer(name, "Connected"));
  });

  socket.on("new-chat-message", (message) => {
    socket.broadcast.emit("chat-message", createAnswer(users[socket.id], message));
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", createAnswer(users[socket.id], "Disconnected"));
    delete users[socket.id];
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started!");
});
app.listen(4000, () => {
  console.log("Express started");
});


createAnswer = (name, message) => {
  return {
    name, message
  }
}
