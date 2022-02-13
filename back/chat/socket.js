const {
  addUserToConnectedList,
  getRoomUsers,
  removeUserFromDB,
} = require("./chatFunctions");

const chatServer = (io) => {
  io.on("connection", (socket) => {
    console.log("User is connected ", socket.id);
    socket.on("joinRoom", async ({ username, room }) => {
      const userId = socket.id;
      await socket.join(room);
      await addUserToConnectedList(userId, username, room);
      socket.to(room).emit("userJoined", { userId });
      //Sending list of connected_user from DB
      // getRoomUsers(socket);
    });

    socket.on("messageSent", (data) => {
      socket.broadcast.to("Room").emit("messageReceived", data);
    });

    socket.on("callUser", (data) => {
      socket.broadcast.to("Room").emit("callUser", {
        signal: data.signal,
        from: data.from,
        name: data.username,
      });
    });

    socket.on("answerCall", (data) => {
      console.log("waslet l data ba3ed l answer");
      socket.broadcast.to("Room").emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
      //emit user disconnected to others
      removeUserFromDB(socket.id);
      socket.broadcast.to("Room").emit("userDisconnected", socket.id);
      //Remove connected user from DB
      //Update list of connected_user
      console.log(`user disconnected`, socket.id);
    });
  });
};

module.exports = { chatServer };
