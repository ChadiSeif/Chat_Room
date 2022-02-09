import React, { useEffect, useState, useRef } from "react";
import { Avatar, Badge } from "@mui/material/";
import ScrollToBottom from "react-scroll-to-bottom";
import "./testchat.css";
import {
  joinRoom,
  messagesLog,
  receiveMessage,
  sendMessageAction,
  usersConnected,
  getusersConnected,
} from "../JS/actions/chatActions";
import { userCurrent } from "../JS/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import MessageSender from "./messageSender";
import MessageReceiver from "./messageReceiver";

const Testchat = ({ socket }) => {
  //**React Redux configs ( dispatch and data from store) */
  const dispatch = useDispatch();

  let user = useSelector((state) => state.userReducer.user);
  let messages = useSelector((state) => state.chatReducer.messages);
  let users_connected = useSelector(
    (state) => state.chatReducer.users_connected
  );

  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      message: message,
      user_id: user.id,
      username: user.username,
      sent_at: Date.now(),
    };
    await dispatch(sendMessageAction(messageData, socket));
  };

  useEffect(() => {
    dispatch(getusersConnected());
  }, []);

  useEffect(() => {
    dispatch(receiveMessage(socket));
  }, [dispatch]);

  useEffect(() => {
    if ((messages = [])) {
      dispatch(messagesLog());
    }
    if ((user = {})) {
      dispatch(userCurrent());
    }

    socket.on("userJoined", (data) => {
      console.log("data received after another user joined ", data);
    });
  }, [dispatch, socket]);

  useEffect(() => {
    const data = {
      username: user.username,
      room: "Room",
    };
    user.username && dispatch(joinRoom(data, socket));
  }, [user.username]);

  useEffect(() => {
    dispatch(usersConnected(socket));
  }, [socket]);

  ///////////////////////::
  ///////////////////////
  ////States for video///
  // const [me, setMe] = userState("");
  // const [stream, setstream] = useState();
  // const [receivingCall, setreceivingCall] = useState(false);
  // const [call, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [idRoCall, setIdToCall] = useState("");
  // const [callEnded, setCallended] = useState(false);
  // const [name, setName] = useState("");

  // const myVideo = useRef(); // to referance to our video Tag
  // const userVideo = useRef();
  // const connectionRef = useRef();

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setstream(stream); //passing stream from webcam to state
  //       myVideo.current.srcObject = stream; //myvideo.current => our ref getting currentobject set the stream from webCam to the ref
  //     });
  // }, []);

  // console.log("list of users are", listUsersConnected);
  return (
    <div>
      <div className="chatContainer">
        <div className="form-inline my-2 my-lg-0">
          <div className="connectedField">
            <div className="searchTab">
              <input type="search" placeholder="Search" aria-label="Search" />
            </div>
            <div className="listConnectedUsers">
              {users_connected &&
                users_connected.map((user) => (
                  <div key={user.id} className="userInformation">
                    <Badge
                      color="success"
                      overlap="circular"
                      badgeContent=" "
                      variant="dot"
                      className="mr-2"
                    >
                      <Avatar sx={{ width: 22, height: 22, fontSize: "12px" }}>
                        {"Username".substr(0, 2)}
                      </Avatar>
                    </Badge>
                    {user.username}
                  </div>
                ))}
            </div>
          </div>
          <div className="messagesField">
            <div className="userInformations">Welcome {user.username} ID :</div>
            <ScrollToBottom>
              <div className="messagesContainer">
                {messages &&
                  messages.map((msg) =>
                    user.username === msg.username ? (
                      <MessageSender key={msg.id} msg={msg} />
                    ) : (
                      <MessageReceiver key={msg.id} msg={msg} />
                    )
                  )}
              </div>
            </ScrollToBottom>

            <div className="messagesInput">
              <input
                type="text"
                style={{ fontSize: "12px" }}
                placeholder="Type here..."
                className="form-control"
                // value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && sendMessage(e);
                  setMessage("");
                }}
              />
              <button
                className="btn btn-primary ml-5"
                onClick={(e) => {
                  sendMessage(e);
                  setMessage("");
                }}
              >
                send
              </button>
              {/* <FiSend
                // style={{ padding: "10px" }}
                onClick={(e) => {
                  // sendMessage(e);
                  setMessage("");
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testchat;
