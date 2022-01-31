import { JOIN_ROOM, SEND_MESSAGE, RECEIVE_MESSAGE } from "./actionTypes";

let initialState = {
  messages: [],
  joined: false,
  user: {},
  error: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOIN_ROOM:
      return { ...state, joined: true, user: payload };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case RECEIVE_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    default:
      return state;
  }
};

export default rootReducer;
