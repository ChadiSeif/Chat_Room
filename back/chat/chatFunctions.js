//// array of users in chat
const pg = require("../db");
const users = [];

async function addUserToConnectedList(id, username, room) {
  try {
    const userFound = await pg.query(
      "SELECT username FROM connected_users WHERE username = ($1)",
      [username]
    );
    console.log("rows de zero");
    if (!userFound.rows[0]) {
      const result = await pg.query(
        "INSERT INTO connected_users ( username , chat_id , room ) values ($1,$2,$3)",
        [username, id, room]
      );
      return console.log("userjoin result is ", result);
    } else {
      const result = await pg.query(
        "UPDATE connected_users set chat_id =($2) where username = ($1)",
        [username, id]
      );
      return console.log("userjoin result is ", result);
    }
  } catch (error) {
    console.log(error);
  }

  //   console.log("array of users", users);
  //   users.push(user);
  //   return user;
}

async function removeUserFromDB(chat_id) {
  try {
    const result = await pg.query(
      "DELETE FROM connected_users WHERE chat_id = ($1) RETURNING*",
      [chat_id]
    );
    return result;
  } catch (error) {
    return error;
  }
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

module.exports = { addUserToConnectedList, removeUserFromDB, getRoomUsers };
