const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const path = require("path");
const cors = require("cors");

const rooms = {room1: {users: {}}, room2: {users: {}}};

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/dist/chat"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/chat/index.html"));
});

app.get("/rooms", (req, res) => {
  res.json({rooms});
});

app.post("/rooms", (req, res) => {
  const {name: roomName} = req.body;
  if (rooms[roomName]) {
    return res.json({status: error});
  }
  rooms[roomName] = {users: {}};
  io.emit("new-room-created", {[roomName]: rooms[roomName]});
});

app.get("/rooms/:room", (req, res) => {
  res.json({roomName: req.params.room});
});

io.on("connection", (socket) => {
  socket.on("new-user", (name, room) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit("user-connected", createAnswer(name, "Connected"));
  });

  socket.on("new-chat-message", (message, room) => {
    socket.to(room).broadcast.emit("chat-message", createAnswer(rooms[room].users[socket.id], message));
  });

  socket.on("disconnect", () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit("user-disconnected", createAnswer(rooms[room].users[socket.id], "Disconnected"));
      delete rooms[room].users[socket.id];
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started!");
});

createAnswer = (name, message) => {
  return {
    name, message,
  };
};
getUserRooms = (socket) => {
  return Object.entries(rooms).reduce((acc, room) => {
    const [roomName, value] = room;
    if (value.users[socket.id])
      acc.push(roomName);
    return acc;
  }, []);

};
