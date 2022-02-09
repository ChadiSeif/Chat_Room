const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  validate,
} = require("../middleware/formValidator");
const {
  registerUser,
  getUser,
  loginUser,
  Current,
} = require("../controllers/user");
const IsAuth = require("../middleware/isAuth");

//@desc : registerUser
//@path : /register
//@method: post
//data : req.body
router.post("/register", userValidationRules(), validate, registerUser);

//@desc : searchUser
//@path : /getuser/:id
//@method: get
//data :none
router.get("/getuser/:id", getUser);

//@desc: loginUser
//@path: /login
//@method : post
//@data : req.body
router.post("/login", loginUser);

router.get("/Current", IsAuth, Current);

module.exports = router;
