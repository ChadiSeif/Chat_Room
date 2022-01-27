import { io } from "socket.io-client";
import { JOIN_ROOM, SEND_MESSAGE } from "./actionTypes";
const socket = io("http://127.0.0.1:3001");

const initialState = {
  messages: {},
  error: {},
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOIN_ROOM:
      return socket.emit(payload);
    case SEND_MESSAGE:
      return socket.emit(payload);
    default:
      return state;
  }
};
