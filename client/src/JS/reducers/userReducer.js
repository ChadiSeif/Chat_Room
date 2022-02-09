import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CURRENT_USER,
  CURRENT_USER_FAIL,
} from "../actionTypes";

const initstate = {
  user: {},
  loginError: "",
  registerErrors: [],
  errorAuth: "",
  isAuth: false,
};

const userReducer = (state = initstate, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, user: payload.user, isAuth: true };
    case USER_LOGIN_FAIL:
      return { ...state, loginError: payload.msg };
    case USER_REGISTER_SUCCESS:
      return { ...state, user: payload.user, isAuth: true };
    case USER_REGISTER_FAIL:
      return { ...state, registerErrors: payload.errors };
    case CURRENT_USER:
      return { ...state, user: payload.rows[0], isAuth: true };
    case CURRENT_USER_FAIL:
      return { ...state, errorAuth: payload.errors };
    default:
      return state;
  }
};

export default userReducer;
