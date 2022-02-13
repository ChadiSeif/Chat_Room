import {
  JOIN_ROOM,
  SEND_MESSAGE_FAIL,
  RECEIVE_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  GET_LIST_MESSAGES_SUCCESS,
  GET_LIST_MESSAGES_FAIL,
  GET_USERS_CONNECTED_SUCCESS,
  GET_USERS_CONNECTED_FAIL,
  // ADD_USER_TO_CONNECTEDLIST,
} from "../actionTypes";

let initialState = {
  messages: [],
  messages_log: [],
  joined: false,
  user: {},
  users_connected: [],
  error: {},
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOIN_ROOM:
      return { ...state, joined: true, user: payload };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        error: payload,
      };
    case RECEIVE_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    // case ADD_USER_TO_CONNECTEDLIST:
    //   return { ...state, users_connected: payload };
    case GET_LIST_MESSAGES_SUCCESS:
      return { ...state, messages: payload };
    case GET_LIST_MESSAGES_FAIL:
      return {
        ...state,
        error: payload,
      };
    case GET_USERS_CONNECTED_SUCCESS:
      return { ...state, users_connected: payload };
    case GET_USERS_CONNECTED_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
