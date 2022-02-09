import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CURRENT_USER,
  CURRENT_USER_FAIL,
} from "../actionTypes";

export const registerUser = (user) => async (dispatch) => {
  try {
    const result = await axios.post("/api/user/register", user);
    localStorage.setItem("token", result.data.token);
    return dispatch({ type: USER_REGISTER_SUCCESS, payload: result.data });
  } catch (error) {
    return dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data });
  }
};

export const loginUser =
  (userLoginInformations, navigate) => async (dispatch) => {
    try {
      // console.log("user from redux is", userLoginInformations);
      const result = await axios.post("/api/user/login", userLoginInformations);
      localStorage.setItem("token", result.data.token);
      navigate("/test");

      return dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data });
    } catch (error) {
      return dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
    }
  };

export const userCurrent = () => async (dispatch) => {
  try {
    const config = {
      headers: { authorization: localStorage.getItem("token") },
    };
    const userInfo = await axios.get("/api/user/Current", config);
    // console.log("userinfo", userInfo.data);
    return dispatch({ type: CURRENT_USER, payload: userInfo.data });
  } catch (error) {
    return dispatch({ type: CURRENT_USER_FAIL, payload: error });
  }
};
