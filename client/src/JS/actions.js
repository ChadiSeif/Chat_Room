import { JOIN_ROOM, SEND_MESSAGE, RECEIVE_MESSAGE } from "./actionTypes";

export const joinRoom = (User, socket) => {
  socket.emit(User.room);
  return {
    type: JOIN_ROOM,
    payload: User,
  };
};
export const sendMessageAction = (messageData, socket) => {
  socket.emit("messageSent", messageData);
  return {
    type: SEND_MESSAGE,
    payload: messageData,
  };
};

export const receiveMessage = (socket) => async (dispatch) => {
  await socket.on("messageReceived", (msgReceived) => {
    return dispatch({
      type: RECEIVE_MESSAGE,
      payload: msgReceived,
    });
  });
};
