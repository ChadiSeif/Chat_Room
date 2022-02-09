import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./JS/store";
import Proptypes from "prop-types";
import { assertPropTypes } from "check-prop-types";
import JoinInput from "./components/join";

const renderAlt = (component) => {
  return render(
    <Provider store={store}>
      {component}
      );
    </Provider>
  );
};

describe("Join input tests", () => {
  it("textinput validation", () => {
    renderAlt(<JoinInput />);
    const nameInput = screen.getByTestId("nameInput");
    expect(nameInput).toBeTruthy();
  });

  it("event onChange", () => {
    renderAlt(<JoinInput />);
    const nameInput = screen.getByTestId("nameInput");
    fireEvent.change(nameInput, { target: { value: "hello" } });
    expect(nameInput.value).toBe("hello");
  });

  it("checking proptypes", () => {
    const socket = {
      _callbacks: { $messageReceived: Array(4) },
      acks: {},
      connected: true,
    };
    // renderAlt(<JoinInput />);
    assertPropTypes(JoinInput.propTypes, socket, "props", JoinInput.socket);
  });
});
