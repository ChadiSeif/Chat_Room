import axios from "axios";
import {
  JOIN_ROOM,
  SEND_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE,
  SEND_MESSAGE_FAIL,
  GET_LIST_MESSAGES_FAIL,
  GET_LIST_MESSAGES_SUCCESS,
  GET_USERS_CONNECTED_SUCCESS,
  GET_USERS_CONNECTED_FAIL,
} from "../actionTypes";

export const joinRoom = (data, socket) => {
  const username = data.username;
  const room = data.room;
  socket.emit("joinRoom", { username, room });
  return {
    type: JOIN_ROOM,
    payload: { username, userChatId: socket.id },
  };
};
export const saveMsgInDB = (messageData) => async (dispatch) => {
  try {
    const messageSavedInDb = {
      message: messageData.message,
      user_id: messageData.user_id,
      sent_at: messageData.sent_at,
    };
    console.log("message saved in db", messageSavedInDb);
    await axios.post("/api/messages/addMessage", messageSavedInDb);
    return dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: messageData,
    });
  } catch (error) {
    return dispatch({ type: SEND_MESSAGE_FAIL, payload: error.response.data });
  }
};

export const addMessageToStore = (msgReceived) => {
  return {
    type: RECEIVE_MESSAGE,
    payload: msgReceived,
  };
};

// export const addUserToConnectedList = (user) => {
//   return { type: ADD_USER_TO_CONNECTEDLIST, payload: user };
// };

export const messagesLog = () => async (dispatch) => {
  try {
    const result = await axios.get("/api/messages/getMessage");
    return dispatch({ type: GET_LIST_MESSAGES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_LIST_MESSAGES_FAIL, payload: error.response.data });
  }
};

export const getusersConnected = () => async (dispatch) => {
  try {
    const result = await axios.get("/api/messages/getConnectedUsers");
    console.log("ahaya connected list", result.data);
    return dispatch({
      type: GET_USERS_CONNECTED_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({ type: GET_USERS_CONNECTED_FAIL, payload: error.response.data });
  }
};
