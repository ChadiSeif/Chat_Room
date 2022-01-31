// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import rootReducer from "./JS/reducers";
// import "@testing-library/jest-dom";
// import App from "./App";

// let initialState = {
//   messages: [],
//   joined: false,
//   user: {},
//   error: {},
// };

// const renderWithRedux = (
//   component,
//   { initialState, store = createStore(rootReducer, initialState) } = {} /// ={} means default value
// ) => {
//   return {
//     ...render(<Provider>{component}</Provider>),
//   };
// };

// describe("App", () => {
//   it("chat div appears", () => {
//     renderWithRedux(<App />);
//     const chat = screen.getByTestId("chat");
//     expect(chat).toBe(1);
//   });
// });
