import React, { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./components/chat";
import JoinInput from "./components/join";

const socket = io("http://127.0.0.1:3001");

function App() {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="mainBody">
      {!joined ? (
        <div>
          <h3>My First Chat App</h3>
          <JoinInput
            socket={socket}
            setJoined={setJoined}
            setRoom={setRoom}
            room={room}
            setName={setName}
            name={name}
          />
        </div>
      ) : (
        <div>
          <Chat name={name} room={room} socket={socket} />
        </div>
      )}
    </div>
  );
}

export default App;
