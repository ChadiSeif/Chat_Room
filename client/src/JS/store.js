import { createStore } from "redux";
// import { applyMiddleware, compose } from "redux";
// import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer /* preloadedState, */,
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
