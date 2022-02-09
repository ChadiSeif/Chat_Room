import { combineReducers } from "redux";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
});

export default rootReducer;
