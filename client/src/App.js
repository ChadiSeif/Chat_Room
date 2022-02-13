import React from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Testchat from "./components/testchat";
import Chat from "./components/chat";
import Footer from "./components/footer";
import Auth from "./Pages/Auth";
import "./App.css";

const socket = io("http://127.0.0.1:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/test" element={<Testchat socket={socket} />} />
        <Route exact path="/" element={<Auth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
