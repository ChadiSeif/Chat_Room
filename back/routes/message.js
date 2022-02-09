const express = require("express");
const router = express.Router();
const {
  addMessage,
  getMessage,
  getConnectedUsers,
} = require("../controllers/message");

//@Desc : add message
//@method: post
//@data : req.body
//path : /addMessage
router.post("/addMessage", addMessage);

//@Desc : get message
//@method: get
//@data : no
//path : /getMessage
router.get("/getMessage", getMessage);

router.get("/getConnectedUsers", getConnectedUsers);

module.exports = router;
