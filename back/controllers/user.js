const pg = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res.status(400).send({ msg: "All inputs are required" });
    }
    const userFound = await pg.query(
      "SELECT username from users where username= $1",
      [username]
    );
    if (userFound.rows[0]) {
      return res
        .status(400)
        .send([{ msg: " username already exists , please login" }]);
    }

    //Generating token
    const token = jwt.sign({ username: username }, "1996", {
      expiresIn: "6h",
    });

    //hashing password
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(req.body.password, saltRounds);
    console.log(passwordHashed);

    const result = await pg.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING*",
      [username, email, passwordHashed]
    );
    return res.status(200).send({ user: result.rows[0], token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send([{ msg: "user cannot be added !" }, error]);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userFound = await pg.query("SELECT * from users where id= $1", [
      req.params.id,
    ]);
    return res.status(200).send([{ msg: "user Found !" }, userFound.rows[0]]);
  } catch (error) {
    console.log(error);
    return res.status(400).send([{ msg: "user cannot be found !" }, error]);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send({ msg: "All inputs are required" });
    }

    const userFound = await pg.query("SELECT * from users where username= $1", [
      username,
    ]);
    // console.log(userFound);
    if (!userFound.rows[0]) {
      return res.status(400).send({ msg: " Bad credentials" });
    }

    //verifying password
    const isMatch = await bcrypt.compare(password, userFound.rows[0].password);
    if (!isMatch) {
      return res.status(400).send({ msg: " Bad credentials" });
    }

    //Generating token
    const token = jwt.sign({ username: username }, "1996", {
      expiresIn: "6h",
    });

    return res.status(200).send({ user: userFound.rows[0], token: token });
  } catch (error) {
    return res.status(400).send({ msg: "we have an error" }, error);
  }
};

// exports.Current = async (req, res) => {
//   try {
//     const token = req.headers["authorization"];
//     if (!token) {
//       return res.status(401).send({ msg: "you could not be authorized" });
//     }
//     const decodedToken = jwt.verify(token, "1996");
//     console.log(decodedToken);
//     const user = await pg.query(
//       "SELECT username , id FROM users WHERE username= ($1)",
//       [decodedToken.username]
//     );
//     if (!user) {
//       return res.status(401).send({ msg: "you could not be authorized" });
//     }
//     return res.status(200).send(user.rows);
//   } catch (error) {
//     return res.status(400).send({ error });
//   }
// };

exports.Current = (req, res) => {
  return res.send(req.user);
};
