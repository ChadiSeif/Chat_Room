const jwt = require("jsonwebtoken");
const pg = require("../db");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ msg: "you could not be authorized" });
    }
    const decodedToken = jwt.verify(token, "1996");
    console.log(decodedToken);
    const user = await pg.query(
      "SELECT username , id FROM users WHERE username= ($1)",
      [decodedToken.username]
    );
    if (!user) {
      return res.status(401).send({ msg: "you could not be authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({ error });
  }
};
module.exports = isAuth;
