var pg = require("pg");

var client = new pg.Client(
  "postgres://pufwrdqh:YXDXJqCjvujgKbGUrDS5_iuKt4AOxA9V@castor.db.elephantsql.com/pufwrdqh"
);

// const pool = new Pool({
//   user: "postgres",
//   password: "24414870",
//   host: "localhost",
//   database: "chatroom",
//   port: 5432,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

module.exports = client;
