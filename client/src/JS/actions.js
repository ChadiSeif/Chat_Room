import { io } from "socket.io-client";
import { JOIN_ROOM, SEND_MESSAGE } from "./actionTypes";
const socket = io("http://127.0.0.1:3001");

export const joinRoom = (roomName) => {
  return {
    type: JOIN_ROOM,
    payload: roomName,
  };
};

export const sendMessage = (messageData) => {
  return {
    type: SEND_MESSAGE,
    payload: messageData,
  };
};

// export const receiveMessage = () => async (dispatch) => {
//   try {
//     await socket.on("messageReceived", msgReceived);
//   } catch (error) {}
// };
