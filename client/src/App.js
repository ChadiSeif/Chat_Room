import React from "react";
import { io } from "socket.io-client";
// import { useSelector } from "react-redux";
import Chat from "./components/chat";
import JoinInput from "./components/join";
import Auth from "./Pages/Auth";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Testchat from "./components/testchat";

const socket = io("http://127.0.0.1:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/join" element={<JoinInput />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/test" element={<Testchat socket={socket} />} />
        <Route exact path="/" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
