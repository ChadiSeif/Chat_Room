const { userJoin, getRoomUsers, userLeave } = require("./chatFunctions");

const chatServer = (io) => {
  io.on("connection", (socket) => {
    console.log("User is connected ", socket.id);
    socket.on("joinRoom", async ({ username, room }) => {
      //Add user to DB
      userJoin(socket.id, username, room);

      await socket.join(room);

      console.log(
        `${username} with id = ${socket.id.substring(
          0,
          4
        )} entered the room : ${room}`
      );
      socket.to(room).emit("userJoined", `${username} has joined the chat`);

      //Sending list of connected_user from DB
      getRoomUsers(socket);
    });

    socket.on("messageSent", (data) => {
      console.log(data);
      socket.broadcast.to("Room").emit("messageReceived", data);
    });

    socket.on("callUser", (data) => {
      io.to(data.chat_id).emit("callUser", {
        signal: data.signal,
        from: data.from,
        name: data.username,
      });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted"), data.signal;
    });

    socket.on("disconnect", () => {
      //Remove connected user from DB
      userLeave(socket.id);
      //Update list of connected_user
      getRoomUsers(socket);
      console.log(`user disconnected`, socket.id);
    });
  });
};

module.exports = { chatServer };
