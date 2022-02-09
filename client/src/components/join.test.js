// import JoinInput from "./join";
import rootReducer from "../JS/reducers";
// import { assertPropTypes } from "check-prop-types";
import { JOIN_ROOM } from "../JS/actionTypes";

// describe("join component tests", () => {
//   test("checking proptypes", () => {
//     const socket = 1234;
//     // renderAlt(<JoinInput />);
//     assertPropTypes(JoinInput.propTypes, socket, "prop", JoinInput.socket);
//   });
// });

describe("testing reducers", () => {
  it("should return state", () => {
    const testState = {
      messages: [],
      joined: false,
      user: {},
      error: {},
    };
    const payload = "test";

    const newState = rootReducer(testState, {
      type: JOIN_ROOM,
      payload,
    });
    expect(newState).toEqual({
      messages: [],
      joined: true,
      user: payload,
      error: {},
    });
  });
});
