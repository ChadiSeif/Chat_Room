import React from "react";
import { TextInputField, Button } from "evergreen-ui";
import "./join.css";

const JoinInput = ({ socket, setJoined, setRoom, setName, name, room }) => {
  //** Function to join a room */
  const joinRoom = (e) => {
    e.preventDefault();
    if (name && room) {
      setJoined(true);
      socket.emit("joinRoom", room);
    }
  };

  return (
    <div className="inputField">
      <TextInputField
        name="text-input-name"
        placeholder="Your Name..."
        onChange={(e) => setName(e.target.value)}
      />
      <TextInputField
        name="text-input-name"
        placeholder="Chat Room..."
        onChange={(e) => setRoom(e.target.value)}
        onKeyPress={(e) => {
          e.key === "Enter" && joinRoom(e);
        }}
      />

      <Button
        marginRight={16}
        appearance="primary"
        onClick={(e) => joinRoom(e)}
      >
        Join
      </Button>
    </div>
  );
};

export default JoinInput;
