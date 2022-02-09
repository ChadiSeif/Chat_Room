//// array of users in chat
const pg = require("../db");
const users = [];

function userJoin(id, username, room) {
  const result = pg.query(
    "INSERT INTO connected_users ( username , chat_id , room ) values ($1,$2,$3)",
    [username, id, room]
  );
  console.log("userjoin result is ", result);

  //   console.log("array of users", users);
  //   users.push(user);
  //   return user;
}

function userLeave(chat_id) {
  const result = pg.query("DELETE FROM connected_users WHERE chat_id= ($1)", [
    chat_id,
  ]);
}

async function getRoomUsers(socket) {
  try {
    result = await pg.query("SELECT * FROM connected_users");
    socket.to("Room").emit("roomUsers", result.rows);
    console.log(result.rows);
  } catch (error) {
    console.log("getroom error ", error);
  }

  return users;
}

module.exports = { userJoin, userLeave, getRoomUsers };
