import React from "react";
import { TextInputField, Button } from "evergreen-ui";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { joinRoom } from "../JS/actions/chatActions";
import PropTypes from "prop-types";
import "./join.css";

const JoinInput = ({ socket }) => {
  //** Function to join a room */

  const dispatch = useDispatch();
  const [room, setRoom] = React.useState("");
  const [name, setName] = React.useState("");

  const joiningRoom = (e) => {
    e.preventDefault();
    const UserJoined = {
      id: uuidv4(),
      name: name,
      room: room,
    };
    if (name && room) {
      dispatch(joinRoom(UserJoined, socket));
      // socket.emit("joinRoom", room);
    }
  };

  return (
    <div className="inputField">
      <TextInputField
        label="Name"
        data-testid="nameInput"
        value={name}
        name="text-input-name"
        placeholder="Your Name..."
        onChange={(e) => setName(e.target.value)}
      />
      <TextInputField
        label="Room"
        name="text-input-room"
        placeholder="Chat Room..."
        onChange={(e) => setRoom(e.target.value)}
        onKeyPress={(e) => {
          e.key === "Enter" && joiningRoom(e);
        }}
      />

      <Button
        marginRight={16}
        appearance="primary"
        onClick={(e) => joiningRoom(e)}
      >
        Join
      </Button>
    </div>
  );
};

JoinInput.propTypes = {
  socket: PropTypes.object,
};
export default JoinInput;
