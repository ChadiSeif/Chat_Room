import React, { useState } from "react";
import { TextInput } from "evergreen-ui";
// import { useSelector, useDispatch } from "react-redux";
import { FiSend } from "react-icons/fi";
// import { receiveMessage, sendMessageAction } from "../JS/actions/chatActions";
import PropTypes from "prop-types";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const Chat = ({ socket }) => {
  const [message, setMessage] = useState("");

  // const userDetails = useSelector((state) => state.user);
  // const listMessages = useSelector((state) => state.messages);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(receiveMessage(socket));
  // }, [socket]);

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   const messageData = {
  //     message: message,
  //     name: userDetails.name,
  //     room: userDetails.room,
  //     sent:
  //       new Date(Date.now()).getHours() +
  //       ":" +
  //       new Date(Date.now()).getMinutes(),
  //     // sentAt: new Date(Date.now()).getUTCDate,
  //   };
  //   dispatch(sendMessageAction(messageData, socket));
  // };

  return (
    <div>
      <div className="chat">
        <div className="chatHeader">
          <h5>Room: Username:</h5>
        </div>

        <ScrollToBottom className="messagesArea">
          {/* {listMessages.map((msg) => {
            return (
              <div key={Math.random()} className="messagesContainer">
                <div
                  className="messageText"
                  key={Math.random()}
                  id={userDetails.name === msg.name ? "sender" : "receiver"}
                >
                  {msg.message}
                  <Avatar name={msg.name} size={20} marginLeft={16} />
                </div>
                <div
                  key={Math.random()}
                  id={
                    userDetails.name === msg.name
                      ? "senderTime"
                      : "receiverTime"
                  }
                >
                  sent at {msg.sent}
                </div>
              </div>
            );
          })} */}
        </ScrollToBottom>
        <div className="messageInput">
          <TextInput
            id="textInput"
            style={{ margin: "auto" }}
            name="text-input-name"
            placeholder="Text input placeholder..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" &&
                // sendMessage(e)
                setMessage("");
            }}
          />
          <div className="button">
            <FiSend
              onClick={(e) => {
                // sendMessage(e);
                setMessage("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  socket: PropTypes.object,
};
export default Chat;
