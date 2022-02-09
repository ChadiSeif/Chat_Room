const pg = require("../db");

exports.addMessage = async (req, res) => {
  try {
    const { message, user_id, sent_at } = req.body;
    const result = await pg.query(
      "INSERT INTO messages (message,user_id,sent_at) values ($1,$2,to_timestamp($3/ 1000.0)) RETURNING*",
      [message, user_id, sent_at]
    );
    return res.status(200).send(result.rows[0]);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await pg.query(
      "SELECT messages.message, messages.sent_at, users.username from messages JOIN users ON messages.user_id= users.id order by sent_at"
    );
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.getConnectedUsers = async (req, res) => {
  try {
    const result = await pg.query("SELECT * FROM connected_users");
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(400).send(error);
  }
};
