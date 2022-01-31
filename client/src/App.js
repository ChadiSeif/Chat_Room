import React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Chat from "./components/chat";
import JoinInput from "./components/join";
import "./App.css";

const socket = io("http://127.0.0.1:3001");

function App() {
  const joined = useSelector((state) => state.joined);
  return (
    <div className="mainBody">
      {!joined ? (
        <div>
          <h3>My First Chat App</h3>
          <JoinInput socket={socket} />
        </div>
      ) : (
        <div data-testid="chat">
          <Chat socket={socket} />
        </div>
      )}
    </div>
  );
}

export default App;
