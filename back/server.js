const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);
const port = 3001;

server.listen(port, () => {
  console.log("server is connected on port ", port);
});

//middleWare to allow resources to be requested from another domain
app.use(cors());

app.use(require("./routes/index.js"));

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", async (socket) => {
  console.log("User is connected ", socket.id);

  await socket.join("joinRoom");
  // console.log(
  //   `User with id = ${socket.id.substring(0, 4)} entered the room : ${data}`
  // );

  socket.on("messageSent", async (data) => {
    // socket.broadcast.emit("messageReceived", data);
    socket.emit("messageReceived", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});