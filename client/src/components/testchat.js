import React, { useEffect, useState, useRef } from "react";
import { Avatar, Badge } from "@mui/material/";
import { Form, Switch } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import "./testchat.css";
import {
  joinRoom,
  messagesLog,
  addMessageToStore,
  saveMsgInDB,
  getusersConnected,
  // addUserToConnectedList,
} from "../JS/actions/chatActions";
import { userCurrent } from "../JS/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import MessageSender from "./messageSender";
import MessageReceiver from "./messageReceiver";
import Peer from "simple-peer";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
// import useSentimentAnalysis from "./sentimentAnalysis";

const Testchat = ({ socket }) => {
  //**React Redux configs ( dispatch and data from store) */
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);
  let username = useSelector((state) => state.userReducer.user.username);
  let messages = useSelector((state) => state.chatReducer.messages);
  const userChatId = useSelector((state) => state.chatReducer.user.userChatId);
  let users_connected = useSelector(
    (state) => state.chatReducer.users_connected
  );

  const [message, setMessage] = useState("");
  const [toggleVideo, settoggleVideo] = useState(false);
  // let sentiment = useSentimentAnalysis(message);

  const [msgReceivedTest, setmsgReceived] = useState();
  console.log("msg received is", msgReceivedTest);

  const messageData = {
    message: message,
    user_id: user.id,
    username: username,
    sent_at: Date.now(),
  };

  useEffect(() => {
    const data = {
      username: username,
      room: "Room",
    };
    if (username) {
      dispatch(joinRoom(data, socket));
      dispatch(getusersConnected());
    }
  }, [username]);

  useEffect(() => {
    socket.on("messageReceived", (msgReceived) => {
      console.log("haw wsal", msgReceived);
      // setmsgReceived(msgReceived);
      dispatch(addMessageToStore(msgReceived));
    });
  }, [socket]);

  useEffect(() => {
    socket.on("userJoined", () => {
      dispatch(getusersConnected());
    });
  }, [socket]);
  useEffect(() => {
    socket.on("userDisconnected", () => {
      dispatch(getusersConnected());
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("messageSent", {
      message: message,
      username: username,
      sent_at: Date.now(),
    });
  };

  useEffect(() => {
    if ((messages = [])) {
      dispatch(messagesLog());
    }
    if ((user = {})) {
      dispatch(userCurrent());
    }
  }, [username]);

  useEffect(() => {
    if (toggleVideo) {
      initVideoCall();
    } else if (!toggleVideo && stream) {
      tracks[0].stop();
      tracks[1].stop();
    }
  }, [toggleVideo]);

  ///////////////////////::
  ///////////////////////
  ////States for video///

  const [stream, setstream] = useState();
  const [receivingCall, setreceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallended] = useState(false);
  const [name, setName] = useState(false);
  const [tracks, setTracks] = useState([]);
  const myVideo = useRef(); // to referance to our video Tag
  const userVideo = useRef();
  const connectionRef = useRef();

  console.log("callacceptedis ", callAccepted);

  socket.on("callUser", (data) => {
    console.log(data);
    setreceivingCall(true);
    setCaller(data.from);
    setName(data.name);
    setCallerSignal(data.signal);
  });

  const initVideoCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setstream(stream); //passing stream from webcam to state
        myVideo.current.srcObject = stream; //myvideo.current => our ref getting currentobject set the stream from webCam to the ref
        setTracks(stream.getTracks());
      })
      .catch((error) => console.log(error));
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true, /// here the caller initiate the call
      trickle: false,
      stream: stream,
    });
    peer.on("error", (err) => console.log("error", err));
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signal: data,
        from: userChatId,
        name: username,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      console.log("haw wsal signal", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  //////////////////

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    //set the stream of the other user to the stream
    peer.on("stream", (stream) => {
      console.log(stream);
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  //////////////////:
  const leaveCall = () => {
    setCallended(true);
    connectionRef.current.destroy();
  };

  return (
    <div>
      <div className="welcome">
        {" "}
        <p>Welcome {username} </p>
      </div>
      <div className="chatContainer">
        <div className="form-inline my-2 my-lg-0">
          <div className="connectedField">
            <div className="video-container">
              <div className="videoController">
                <span> Your id : {userChatId} </span>
                <Form.Switch
                  type="switch"
                  id="custom-switch"
                  default="toggleVideo"
                  onClick={() => settoggleVideo(!toggleVideo)}
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="callerVideoDiv">
                {stream ? (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    width="280"
                    height="180"
                    // controls
                  ></video>
                ) : (
                  <h6 style={{ color: "gray" }}>Video not enabled</h6>
                )}
              </div>
              <div className="callerVideoDiv">
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  width="280"
                  height="200"
                  style={{ borderRadius: "20px" }}
                ></video>
              </div>
              <div>
                {callAccepted && !callEnded ? (
                  <HiOutlinePhoneMissedCall onClick={() => leaveCall()} />
                ) : (
                  <div style={{ marginTop: "20px" }}>
                    <input
                      type="text"
                      placeholder="id of user to call..."
                      style={{
                        fontSize: "12px",
                        width: "16vw",
                        height: "25px",
                      }}
                    />
                    <VscCallOutgoing
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => callUser(idToCall)}
                    />
                  </div>
                )}
              </div>
              <div>
                {receivingCall && !callAccepted ? (
                  <div style={{ fontSize: "12px" }}>
                    {name} is Calling...
                    <VscCallIncoming
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => answerCall()}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="messagesField">
            <ScrollToBottom>
              <div className="messagesContainer">
                {messages &&
                  messages.map((msg) =>
                    username === msg.username ? (
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
                style={{ fontSize: "12px", width: "80%" }}
                placeholder="Type here..."
                className="form-control mr-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    dispatch(saveMsgInDB(messageData));
                    sendMessage();
                    setMessage("");
                  }
                }}
              />
              {/* {sentiment === "positive" ? (
                <span>&#128512;</span>
              ) : sentiment === "neutral" ? (
                <span>&#128528;</span>
              ) : sentiment === "negative" ? (
                <span>&#128545;</span>
              ) : null} */}
              <button
                className="btn btn-primary ml-1"
                style={{
                  fontSize: "12px",
                  color: "white",
                }}
                onClick={(e) => {
                  dispatch(saveMsgInDB(messageData));
                  sendMessage();
                  setMessage("");
                }}
              >
                send
              </button>
            </div>
          </div>
          <div className="listConnectedUsers">
            <span
              style={{
                margin: "10px auto",
                fontSize: "0.9vw",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "green",
              }}
            >
              Connected users
            </span>
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
                    <Avatar
                      sx={{
                        width: "1.5vw",
                        height: 22,
                        fontSize: "0.75vw",
                      }}
                    >
                      {user.username.substr(0, 2)}
                    </Avatar>
                  </Badge>
                  {user.username}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testchat;
