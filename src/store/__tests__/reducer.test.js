import reducer from "../reducer";
import { addToHandHistory } from "../actions";
import state from "../initialState";
import initialState from "../initialState";

describe("reducer", () => {
  test("handles addToHandHistory", () => {
    const action = {
      payload: "Player 1 has joined the table",
      type: "addToHandHistory"
    };

    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;

    expect(reducer(state, action)).toEqual({
      ...initialState,
      handHistory: [{ action: action.payload, timeStamp: dateNowStub() }]
    });

    global.Date.now = realDateNow;
  });
});
