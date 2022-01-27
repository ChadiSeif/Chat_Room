import React, { useEffect, useState } from "react";
import { TextInput, Avatar } from "evergreen-ui";
import { FiSend } from "react-icons/fi";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const Chat = ({ socket, name, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // useEffect(() => {
  //   socket.on("messageReceived", (msgReceived) => {
  //     setMessageList((messageList) => [...messageList, msgReceived]);
  //   });
  // }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      message: message,
      name: name,
      room: room,
      sent:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      // sentAt: new Date(Date.now()).getUTCDate,
    };
    await socket.emit("messageSent", messageData);
  };

  return (
    <div>
      <div className="chat">
        <div className="chatHeader">
          <h5>
            Room: {room} Username: {name}
          </h5>
        </div>

        <ScrollToBottom className="messagesArea">
          {messageList.map((msg) => {
            return (
              <div className="messagesContainer">
                <div
                  className="messageText"
                  key={Math.random()}
                  id={name === msg.name ? "sender" : "receiver"}
                >
                  {msg.message}
                  <Avatar name={msg.name} size={20} marginLeft={16} />
                </div>
                <div
                  key={Math.random()}
                  id={name === msg.name ? "senderTime" : "receiverTime"}
                >
                  sent at {msg.sent}
                </div>
              </div>
            );
          })}
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
              e.key === "Enter" && sendMessage(e) && setMessage("");
            }}
          />
          <div className="button">
            <FiSend
              onClick={(e) => {
                sendMessage(e);
                setMessage("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
