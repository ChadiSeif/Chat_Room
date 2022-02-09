const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const client = require("./db/index.js");
const { Server } = require("socket.io");
const { chatServer } = require("./chat/socket.js");

const server = http.createServer(app);
const port = 3001;

server.listen(port, () => {
  console.log("server is connected on port ", port);
});

//middleWares
app.use(cors());
app.use(express.json());

app.use(require("./routes/user.js"));

//routes
app.use("/api/user", require("./routes/user.js"));
app.use("/api/messages", require("./routes/message"));

//Connect to postgres
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].theTime);
  });
});

//Connection to chatRoom
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
chatServer(io);
